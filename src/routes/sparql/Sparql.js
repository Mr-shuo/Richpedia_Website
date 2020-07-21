import React, { useEffect,useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Sparql.less';
import Spinner from '../../components/Spinner/Spinner';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
// import { func } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

class Sparql extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isQuerying: false,
      message: "Please enter your query code...",
      isClear: false,
      isHidden: true,
      result: [],
      isResult: false,
      header:[],
      item:[],
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    // this.handleResult = this.handleResult.bind(this);
  }
  //挂载?
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleQuery()
  {

    if(this.state.isClear)
      {
        console.log("You enter query!");
        this.setState(prevState => (
          {
            isHidden:false
          }
        ));
        return;
      }
      this.setState(prevState => (
        {
          isHidden:true,
          isQuerying:true
        }
      ));
      axios.get('/Richpedia',{
        params: {
          query: this.state.message
        }
      }).then((response)=>
      {
        console.log(response);
        this.handleResult(response);
        var h =[];
        for(let i = 0;i<response.data.names.length;i++)
        {
          let head;
          if(i == 0)
            head = <TableCell key={response.data.names[i].toString()} >{response.data.names[i]}</TableCell>;
          else
            head = <TableCell key={response.data.names[i].toString()}align="left" >{response.data.names[i]}</TableCell>;
            h.push(head);
          if(i>500)
            break;
          
        }
        this.setState(prevState => (
          {
            header:h
          }
        ));
        var items = [];
        for(let i =0;i<response.data.values.length;i++)
        {
            let item =[];
            for(let j =0;j<response.data.values[i].length;j++)
            {
              let row;
              if(j==0)
              {row = <TableCell component="th" scope="row">{response.data.values[i][j]}</TableCell>;}
              else
              row = <TableCell align="left" >{response.data.values[i][j]}</TableCell>;

            item.push(row);
            }
            const r = <TableRow key={response.data.values[i].toString()}>{item}</TableRow>;
            items.push(r);
            if(i>500)
            break;
        }
        this.setState(prevState => (
          {
            item:items,
            isQuerying:false
          }
        ));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(()=>
      {
        this.setState(prevState => (
          {
            isQuerying:false
          }
        ));
      });
  }

  handleResult(res)
  {
    this.setState(prevState => (
      {
        result:res.data,
        isResult:true
      }
    ));
  }

  handleClear()
  {
    {
      this.setState(prevState => (
        {
          isResult: false
        }
      ));
    }
    if(this.state.isClear)
    {
      console.log("It has been cleared!");
      return;
    }
    else
    {
      this.setState(prevState => (
        {
          message: "",
          isClear: true,
          isResult: false
        }
      ));
    }
  }

  handleMessage(event)
  {
    const mes = event.target.value;
    var truth;
    if(mes.length == 0)
    {
     truth = true;
    }
    else
    {
      truth = false;
    }
    this.setState(prevState => (
      {
        message: mes,
        isClear: truth
      }
    ));
    console.log(this.state.message);
  }


  getInfo = () => (
      <div className={s.paraText}>
      <p>
        You can use SPARQL language here to query n-triples.
      </p>
    </div>
  );

  getButton = () =>{
    // const classes = useStyles();
    return(
      <div style={{margin:'10px 0px',}}>
        <Button variant="outlined"  size="large" style={{margin:'0 5px 0 0',}} onClick={this.handleQuery}>Execute</Button>
        <Button variant="outlined"  size="large" style={{margin:'0 0 0 5px',}} onClick={this.handleClear}>Clear</Button>
      </div>
    );
  }

  getTextField = () => (
    <div>
    <TextField
          id="standard-multiline-static"
          label="SPARQL"
          fullWidth
          multiline
          rows={15}
          value={this.state.message}
          variant="outlined"
          ref="myInput"
          onChange={this.handleMessage}
          onBlur={this.handleMessage}
        />
      </div>
  );

  getAlert = () => {
    
    if(this.state.isHidden)
      return;
    return(
      <div>
        <Alert severity="info">Please enter your command</Alert>
      </div>
    );
  }

  getResult = () =>{
    if(this.state.isResult === false)
      return;
    
    return(
      <div>
      <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {this.state.header}
          </TableRow>
        </TableHead>
        <TableBody>
            {this.state.item}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
  }

  getWait = () => {
    if(this.state.isQuerying === false)
    return;
    return(
        <div>
          <LinearProgress />
        </div>
    )
  }


  getContent = () => (
    <div>
      {/* <HeaderMenu /> */}
      <div className={s.root}>
        <h1 className={s.title}>SPARQL</h1>
        {this.getInfo()}
        {this.getTextField()}
        {this.getButton()}
        {this.getAlert()}
        {this.getWait()}
        {this.getResult()}
      </div>
    </div>
  );

  render() {
    return <div>{this.state.isLoading ? <Spinner /> : this.getContent()}</div>;
  }
}

export default withStyles(s)(Sparql);
