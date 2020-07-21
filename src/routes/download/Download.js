import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Download.less';
import Spinner from '../../components/Spinner/Spinner';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';



class Download extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  getInfo = () => (
      <div className={s.paraText}>
      <p>
        You can download parts of images and triples of relationship from here
        through Google Drive. Because the image entity folder is relatively
        large, we split it into three folders(Image1, Image2, Image3) for
        download.
      </p>
      <div>
        <ul>
          <li>
            <span
              style={{ display: 'block', fontSize: '23px', fontWeight: '700' }}
            >
              Image
            </span>
            <span style={{ display: 'block' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/open?id=1QVAUWf87v2Lct1YYlygOpphwE5TMlNBg"
              >
                Image1
              </a>
            </span>
            <span style={{ display: 'block' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/open?id=15aoYUdCB5_bhagz3TlbBhkA3MLGBJv9P"
              >
                Image2
              </a>
            </span>
            <span style={{ display: 'block' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/open?id=1TiATEauW91_ptJz4qCk0Kn1p_6gojXTf"
              >
                Image3
              </a>
            </span>
          </li>
          <li>
            <span
              style={{ display: 'block', fontSize: '23px', fontWeight: '700' }}
            >
              NT Files
            </span>
            <span style={{ display: 'block' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/drive/folders/1---n-BKB8ZUhTmURh6qzSwNMopzWmCmZ?usp=sharing"
              >
                Triples
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  getContent = () => (
    <div>
      {/* <HeaderMenu /> */}
      <div className={s.root}>
        <h1 className={s.title}>Download</h1>
        {this.getInfo()}
      </div>
    </div>
  );

  render() {
    return <div>{this.state.isLoading ? <Spinner /> : this.getContent()}</div>;
  }
}

export default withStyles(s)(Download);
