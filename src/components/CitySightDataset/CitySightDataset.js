/* eslint-disable react/no-did-mount-set-state,camelcase */
import React from 'react';
// import ReactDOM from 'react-dom'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Cascader } from 'antd';
// import '../../../node_modules/antd/dist/antd.css';
import { IoMdHelpCircle } from 'react-icons/io';
import { TiArrowBackOutline } from 'react-icons/ti';
import s from './CitySightDataset.less';
import Spinner from '../Spinner/Spinner';
import CityPictureCard from '../CityPictureCard/CityPictureCard';
import SightPictureCard from '../SightPictureCard/SightPictureCard';
import sightInfo from '../../../data_src/city_sight/city_sight';
import {
  getCityNameById,
  getSightNameById,
} from '../../../data_operation/city_sight/getDataNameById';
import getPicByCityId from '../../../data_operation/city_sight/getPicByCityId';
import getPicBySightId from '../../../data_operation/city_sight/getPicBySightId';
import getCityTextById from '../../../data_operation/city_sight/getCityTextById';


class CitySightDataset extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      cityID: '',
      sightID: '',
      cityName: 'default',
      sightName: 'default',
      picList: [],
      picNum: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  onSelectChange = value => {
    window.stop();
    const city = getCityNameById(value[0]);
    const sight = getSightNameById(value[1]);
    let list = [];
    let number = 0;
    if (city === 'default') {
      list = [];
      number = 0;
    } else if (sight === 'default') {
      const { picList, num } = getPicByCityId(value[0]);
      list = picList;
      number = num;
    } else {
      const { picList, num } = getPicBySightId(value[1]);
      list = picList;
      number = num;
    }
    this.setState({
      cityID: value[0],
      sightID: value[1],
      cityName: city,
      sightName: sight,
      picList: list,
      picNum: number,
    });
  };

  getPromptText = () => (
    <div>
      <div className={s.promptText}>
        <a href="/dataset" className={s.goBack}>
          <TiArrowBackOutline />
        </a>
        <span>
          Select city and sight to get knowledge of Richpedia Dataset.
        </span>
      </div>
      <div className={s.noteText}>
        Note: Since the whole dataset is giant in scale and amount, what we show
        here is a filtered subset having all the key features of Richpedia
        Dataset. For the whole dataset, please go to{' '}
        <a href="/download">Download section</a>.
      </div>
      <div
        className={s.noteText}
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IoMdHelpCircle style={{ color: '#77628c', marginRight: '5px' }} />
        <span>
          Have trouble using it? Read <a href="/tutorial">tutorial</a> here.
        </span>
      </div>
    </div>
  );

  getSelecter = () => (

    <Cascader
      options={sightInfo}
      onChange={this.onSelectChange}
      placeholder="Please select"
      changeOnSelect
      size="middle"
      bordered="true"
      expandTrigger="hover"
    />
  );
  // getSelecter = ReactDOM.render(
  //   <Cascader options={sightInfo}
  //       onChange={this.onSelectChange}
  //       placeholder="Please select"
  //       changeOnSelect />,
  //   mountNode,
  // );

  getPicNum = () => {
    const { picNum } = this.state;
    return picNum ? (
      <span style={{ marginLeft: '20px', fontSize: '18px', fontWeight: '600' }}>
        {picNum} pictures in total
      </span>
    ) : null;
  };

  getCitySightInfo = () => {
    const { cityName, sightName, cityID, sightID } = this.state;
    if (cityName === 'default') {
      return null;
    }

    if (sightName === 'default') {
      // city only
      const {
        sovereign_state,
        total_area,
        total_population,
        time_zone,
      } = getCityTextById(cityID);

      return (
        <div className={s.infoTextBox}>
          <div style={{ minWidth: '40%' }}>
            <div>
              <span className={s.infoLabel}>City_id:</span>
              <span className={s.infoValue}>{cityID}</span>
            </div>
            <div>
              <span className={s.infoLabel}>Name:</span>
              <span className={s.infoValue}>{cityName}</span>
            </div>
            <div>
              <span className={s.infoLabel}>Sovereign State:</span>
              <span className={s.infoValue}>{sovereign_state}</span>
            </div>
          </div>
          <div style={{ minWidth: '40%' }}>
            <div>
              <span className={s.infoLabel}>Total Area:</span>
              <span className={s.infoValue}>
                {total_area}km<sup>2</sup>
              </span>
            </div>
            <div>
              <span className={s.infoLabel}>Total Population:</span>
              <span className={s.infoValue}>{total_population}</span>
            </div>
            <div>
              <span className={s.infoLabel}>Time Zone:</span>
              <span className={s.infoValue}>{time_zone}</span>
            </div>
          </div>
        </div>
      );
    }
    // console.log(sightID);
    // sightID.replace("http://rich.wangmengsd.com/resource/","rps:");

    // sight
    return (
      <div className={s.infoTextBox}>
        <div>
          <span className={s.infoLabel}>Sight_id:</span>
          <span className={s.infoValue}>{sightID}</span>
        </div>
        <div>
          <span className={s.infoLabel}>Name:</span>
          <span className={s.infoValue}>{sightName}</span>
        </div>
        <div>
          <span className={s.infoLabel}>Location:</span>
          <span className={s.infoValue}>{cityName}</span>
        </div>
      </div>
    );
  };

  getContent = () => (
    <div className={s.root}>
      {this.getPromptText()}
      {this.getSelecter()}
      {this.getPicNum()}
      {this.getCitySightInfo()}
      {this.getPictures()}
    </div>
  );

  getPictures = () => {
    const { picList, picNum, cityName, sightName } = this.state;
    if (cityName === 'default')
      // return <div className={s.emptyPicBox}>Please select city or sight.</div>;
      return <div className={s.emptyPicBox}></div>;
    if (sightName === 'default') {
      // city only
      if (picNum) return this.showCityPictures(picList);
    }
    if (picNum) return this.showSightPictures(picList);
    return null;
  };

  showCityPictures = pic_list => {
    const list = [];
    pic_list.forEach(item => {
      list.push(
        <CityPictureCard
          picId={item}
          cityName={this.state.cityName}
          key={item}
        />,
      );
    });
    return (
      <div className={s.picRoot}>
        <div className={s.picBox}>{list}</div>
      </div>
    );
  };

  showSightPictures = pic_list => {
    const list = [];
    pic_list.forEach(item => {
      list.push(
        <SightPictureCard
          picId={item}
          sightId={this.state.sightID}
          sightName={this.state.sightName}
          key={item}
        />,
      );
    });
    return (
      <div className={s.picRoot}>
        <div className={s.picBox}>{list}</div>
      </div>
    );
  };

  render() {
    return <div>{this.state.isLoading ? <Spinner /> : this.getContent()}</div>;
  }
}

export default withStyles(s)(CitySightDataset);
