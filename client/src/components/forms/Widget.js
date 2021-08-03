import React, { Component } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import {Input} from 'antd'
import connect from './Connector';

class Places extends Component {
    static propTypes = {
        refine: PropTypes.func.isRequired,
        defaultRefinement: PropTypes.object.isRequired,
    };

    createRef = c => (this.element = c);

    componentDidMount() {
        const { refine, defaultRefinement } = this.props;
        const autocomplete = places({
            container: this.element,
            type: 'city'
        });
        autocomplete.on('change', e => {
            refine(e.suggestion.name);
            // console.log('e.sugestion->', e.suggestion)
        });

        autocomplete.on('clear', () => {
            refine(defaultRefinement);
        });
    }

    render() {
        const { refine, defaultRefinement } = this.props;
        return (
            <div >
                <input
                    ref={this.createRef}
                    type="search"
                    // style={{width:'98%'}}
                    id="address-input"
                    placeholder="Enter location..."
                />
            </div>
        );
    }
}
export default connect(Places);