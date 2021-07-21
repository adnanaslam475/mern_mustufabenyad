import React, { Component } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
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
            type:'city'
        });

        autocomplete.on('change', event => {
            refine(event.suggestion.latlng);
            console.log('object',event.suggestion.latlng)
        });

        autocomplete.on('clear', () => {
            refine(defaultRefinement);
        });
    }

    render() {
        return (
            <div style={{ marginBottom: 20 }}>
                <input
                    ref={this.createRef}
                    type="search"
                    id="address-input"
                    placeholder="Where are we going?"
                />
            </div>
        );
    }
}

export default connect(Places);