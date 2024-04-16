import { Typography } from '@mui/material';
import moment from 'moment';
import React, { Component } from 'react';

class RealTimeClock extends Component {
    constructor(props) {
        super(props);

        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <Typography
                fontSize={12}
                mr={1}
            >
                {moment(this.state.date).format('ddd D MMMM | HH:mm:ss')}
                {' hrs'}
            </Typography>
        );
    }
}

export default RealTimeClock;
