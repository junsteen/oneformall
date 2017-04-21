import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from './list'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formnames: this.props.formnames,
      formgroupsUniqe: this.initconverttags(this.props.formnames),
      storeforms: this.props.storeforms,
      toggle: "open"
    };

  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });
  }
  render() {
    var ListNodes;
    if(this.state.toggle=="open"){
      ListNodes =<List storeforms={this.state.storeforms} formnames={this.state.formnames} formgroupsUniqe={this.state.formgroupsUniqe} inputname={this.props.inputname}/>
    }else if(this.state.toggle=="close"){
    ListNodes =<div></div>
    }else{
      ListNodes =<div>読み込み中...</div>
    }
    //Count: {this.props.count}
    return (
      <div className="card">
        {ListNodes}
      </div>
    );
  }
  //使用するタグのみの配列
  initconverttags(formnames){

    var formgroupsUniqe={};
    var before="";
      for ( var key in formnames) {
        if(before!=formnames[key].tagGroup){
        formgroupsUniqe[formnames[key].tagGroup]=[{"tagName":formnames[key].tagName,"tag":formnames[key].tag,"tagGroup":formnames[key].tagGroup,"tagGroupName":formnames[key].tagGroupName,"inputName":formnames[key].inputName,"tagOrder":formnames[key].tagOrder}];
          before=formnames[key].tagGroup;
        }else{
          formgroupsUniqe[formnames[key].tagGroup].push({"tagName":formnames[key].tagName,"tag":formnames[key].tag,"tagGroup":formnames[key].tagGroup,"tagGroupName":formnames[key].tagGroupName,"inputName":formnames[key].inputName,"tagOrder":formnames[key].tagOrder});
        }

      }
      //console.log(formgroupsUniqe);
      var formbiggroupsUniqe={'office':{},'personal':{}};

      for ( var key in formgroupsUniqe) {
        //console.log("formgroupsUniqe[key]");
        //console.log(key);
          if(!key.indexOf('office')){
            formbiggroupsUniqe['office'][key]=formgroupsUniqe[key];
          }else{
            formbiggroupsUniqe['personal'][key]=formgroupsUniqe[key];
          }
      }
      //console.log(formbiggroupsUniqe);
      return formbiggroupsUniqe;

  }

}

const mapStateToProps = (state) => {
  return {
    //count: state.count
    count: state.counter,
    formnames: state.formnames,
    storeforms: state.storeforms
  };
};

export default connect(mapStateToProps)(App);
