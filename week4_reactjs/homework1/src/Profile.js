import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      current: PropTypes.number,
    }),
    onClickProfile: PropTypes.func
  }
  clickProfile = () => {
    console.log('this.props.data', this.props.data);
    this.props.onClickProfile(this.props.data);
  }
  render() {
    return (
      <div>
        <span>hi this is profile {this.props.number}.</span>
        <button onClick={this.clickProfile}>profile click</button>
      </div>
    );
  }
}

export default Profile;
