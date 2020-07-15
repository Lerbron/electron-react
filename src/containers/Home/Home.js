import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setNum } from 'actions/testActions'
import { Button } from 'antd';
import Record from 'components/Record'
import AudioWrap from 'components/Record/AudioWrap'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state= {
      audioSrc: '',
      file: null
    }
  }
  render() {
    let { audioSrc } =this.state
    return(
      <div>
        <div className='content'>{this.props.num}</div>
        <Button onClick={this.props.setNum}>button</Button>
        <Button onClick={this.goDetail}>go detail</Button>
        <Record setRecordFile={this.setRecordFile} />
        { audioSrc && <AudioWrap audioSrc={audioSrc}/> }
      </div>
    )
  }

  setRecordFile= (file) => {
    this.setState({recordFile: file, audioSrc: URL.createObjectURL(file)})
  }

  goDetail= () => {
    this.props.history.push('/detail')
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    num: state.test.num
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNum: () => {
      dispatch(setNum())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)