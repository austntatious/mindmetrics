import { render } from "react-dom";
import React, {Component} from "react";

export default class App extends Component {
    state = {
        // This is a state variable for simplicity.
        // Ideally, it should go to a Redux store.
        mobile: false
    }

    static childContextTypes = {
        mobile: React.PropTypes.bool
    }

    getChildContext() {
        return {
            mobile: this.state.mobile
        };
    }

    checkForMobile = () => {
        let mobile = window.matchMedia( '(max-width: 767px)' ).matches;
        // TODO should we have a separate "tab" and "mobile" boolean?
        if (window.matchMedia( '(max-width: 549px)' ).matches) {
            mobile = "small";
        }

        this.setState({mobile});
    }

    componentWillMount() {
        this.checkForMobile();
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkForMobile);
    }

    render() {
        return this.props.children;
    }
}
