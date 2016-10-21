import React, { Component } from 'react';

import Title from './Title';
import SectionHat from './SectionHat';

export default class BehaviorReport extends Component {
    static defaultProps = {
        text: `                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto aut culpa dolor dolore doloremque ducimus eaque eligendi excepturi facilis harum illum nesciunt odio quas, quasi quia quisquam sequi similique sint tenetur velit vitae, voluptate, voluptatum! Amet fugit impedit maxime molestiae rerum! Ad hic obcaecati optio sapiente veniam! Aliquid asperiores corporis culpa expedita ipsum officiis quam quo repellat reprehenderit voluptas?`,
        likelyBehaviorList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        unlikelyBehaviorList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    }

    render() {
        return (
            <div className="beh-report container">
                <SectionHat title="Behavior report"/>

                <div className="beh-report__row">
                    <div className="beh-report__col">
                        <span className="beh-report__text">
                            {this.props.text}
                        </span>
                    </div>
                    <div className="beh-report__col">
                        <div className="beh-report__likes">
                            <Title size="2">
                                You are likely to:
                            </Title>
                            <ul className="beh-report__list">
                                {this.props.likelyBehaviorList.map((t, i) =>
                                    <li className="beh-report__el" key={i}>
                                        <span className="beh-report__item">
                                            {t}
                                        </span>
                                    </li>
                                 )}
                            </ul>
                        </div>
                    </div>
                    <div className="beh-report__col">
                        <div className="beh-report__unlikes">
                            <Title size="2">
                                You are unlikely to:
                            </Title>
                            <ul className="beh-report__list">
                                {this.props.unlikelyBehaviorList.map((t, i) =>
                                    <li className="beh-report__el" key={i}>
                                        <span className="beh-report__item">
                                            {t}
                                        </span>
                                    </li>
                                 )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
