import React, { Component } from "react";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0,
    },
  };

  state = {
    //우리는 수정버튼을 눌렀을때 editing 값을 true로 설정 해줄 것입니다.
    //이 값이 true 일때에는 기존에 텍스트 형태로 보여주던 값들을
    //input 형태로 보여주게 됩니다.
    editing: false,

    //input을 보여주고나서 그 안에 값들은 유동적이므로 담기 위함
    name: "",
    phone: "",
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  //editing 값을 반전 시키는 함수
  // true->false , false -> true
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  //input에서 onChange 이벤트가 발생 될 때 호출 되는 함수
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //여기서는 editing 값이 바뀔때 처리하는 로직
    //수정을 누르면 기존의 값이 input에 나타남
    //수정을 적용하면 input 값들을 부모한테 전달해줌

    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      //editing 값이 false -> true로 전환 될때
      this.setState({
        name: info.name,
        phone: info.phone,
      });
    }

    if (prevState.editing && !this.state.editing) {
      //editing 값이 true -> false로 전환 될때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
      });
    }
  }

  render() {
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px",
    };

    const { editing } = this.state;

    //수정 모드
    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    //일반모드

    const { name, phone } = this.props.info;

    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
