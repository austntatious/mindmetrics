import React, { Component } from 'react';
import d3 from "d3";

require('../styles/app.less');

import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Social from './Social';
import SectionHat from './SectionHat';
import Logo from './Logo';
import User from './User';
import Action from './Action';
import Hamburger from './Hamburger';
import Copyright from './Copyright';
import BehaviorReport from './BehaviorReport';
import Traits from './Traits';

import {Tabs, TabDescr} from './Tabs';

const USER = { name: 'Your name', ico: '/client/img/user-ico-1.png'};

const TABS = [
    {
        id: 1,
        title: 'Personality',
        ico: 'client/img/ico-personality.svg',
        descr: 'This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. '
    },
    {
        id: 2,
        title: 'Needs',
        ico: 'client/img/ico-needs.svg',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequatur fuga fugiat molestiae nulla obcaecati perferendis quo soluta, suscipit. Amet distinctio dolore esse ex minus quaerat vitae! Deserunt dolorum, sequi?'
    },
    {
        id: 3,
        title: 'Values',
        ico: 'client/img/ico-values.svg',
        descr: 'Ab consequuntur culpa cum cupiditate distinctio ea excepturi expedita facilis fugiat, harum illo, impedit in iusto magnam nulla odio officiis placeat praesentium quam quasi quia quis recusandae rem repudiandae sequi soluta suscipit temporibus totam unde vero.'
    }
];

const TRAITS = [
    {
        "id": "Openness",
        "name": "Openness",
        "category": "personality",
        "percentage": 0.44361758476762087,
        "sampling_error": 0.04462713392,
        "children": [
            {
                "id": "Adventurousness",
                "name": "Adventurousness",
                "category": "personality",
                "percentage": 0.5532854151651384,
                "sampling_error": 0.04010701756
            },
            {
                "id": "Artistic interests",
                "name": "Artistic interests",
                "category": "personality",
                "percentage": 0.9291882835007435,
                "sampling_error": 0.08443736236
            },
            {
                "id": "Emotionality",
                "name": "Emotionality",
                "category": "personality",
                "percentage": 0.6117420783689655,
                "sampling_error": 0.03824283696
            },
            {
                "id": "Imagination",
                "name": "Imagination",
                "category": "personality",
                "percentage": 0.3105372335468214,
                "sampling_error": 0.05136958392
            },
            {
                "id": "Intellect",
                "name": "Intellect",
                "category": "personality",
                "percentage": 0.41658474012246943,
                "sampling_error": 0.04272941112
            },
            {
                "id": "Liberalism",
                "name": "Authority-challenging",
                "category": "personality",
                "percentage": 0.17419106623159802,
                "sampling_error": 0.0675579054
            }
        ]
    },
    {
        "id": "Conscientiousness",
        "name": "Conscientiousness",
        "category": "personality",
        "percentage": 0.7953785021598482,
        "sampling_error": 0.058016039,
        "children": [
            {
                "id": "Achievement striving",
                "name": "Achievement striving",
                "category": "personality",
                "percentage": 0.6523027025711666,
                "sampling_error": 0.08080605176
            },
            {
                "id": "Cautiousness",
                "name": "Cautiousness",
                "category": "personality",
                "percentage": 0.7668833582720871,
                "sampling_error": 0.07473330316
            },
            {
                "id": "Dutifulness",
                "name": "Dutifulness",
                "category": "personality",
                "percentage": 0.8005216603626711,
                "sampling_error": 0.04894629932
            },
            {
                "id": "Orderliness",
                "name": "Orderliness",
                "category": "personality",
                "percentage": 0.41818852489759367,
                "sampling_error": 0.054480602839999996
            },
            {
                "id": "Self-discipline",
                "name": "Self-discipline",
                "category": "personality",
                "percentage": 0.7976331867326636,
                "sampling_error": 0.04283100108
            },
            {
                "id": "Self-efficacy",
                "name": "Self-efficacy",
                "category": "personality",
                "percentage": 0.8419527483789538,
                "sampling_error": 0.07499131412
            }
        ]
    },
    {
        "id": "Extraversion",
        "name": "Extraversion",
        "category": "personality",
        "percentage": 0.9146865456005568,
        "sampling_error": 0.04312390508,
        "children": [
            {
                "id": "Activity level",
                "name": "Activity level",
                "category": "personality",
                "percentage": 0.1990814362675058,
                "sampling_error": 0.060655533399999996
            },
            {
                "id": "Assertiveness",
                "name": "Assertiveness",
                "category": "personality",
                "percentage": 0.7752378106634695,
                "sampling_error": 0.06650312732
            },
            {
                "id": "Cheerfulness",
                "name": "Cheerfulness",
                "category": "personality",
                "percentage": 0.802624726385728,
                "sampling_error": 0.0833041548
            },
            {
                "id": "Excitement-seeking",
                "name": "Excitement-seeking",
                "category": "personality",
                "percentage": 0.3934602042271858,
                "sampling_error": 0.07182009356
            },
            {
                "id": "Friendliness",
                "name": "Outgoing",
                "category": "personality",
                "percentage": 0.9004015142865369,
                "sampling_error": 0.06083655756
            },
            {
                "id": "Gregariousness",
                "name": "Gregariousness",
                "category": "personality",
                "percentage": 0.8019747277413891,
                "sampling_error": 0.050568287760000004
            }
        ]
    },
    {
        "id": "Agreeableness",
        "name": "Agreeableness",
        "category": "personality",
        "percentage": 0.9236001790723336,
        "sampling_error": 0.07963770056,
        "children": [
            {
                "id": "Altruism",
                "name": "Altruism",
                "category": "personality",
                "percentage": 0.9096245650638989,
                "sampling_error": 0.05499027136
            },
            {
                "id": "Cooperation",
                "name": "Cooperation",
                "category": "personality",
                "percentage": 0.8198296167763047,
                "sampling_error": 0.06796574488
            },
            {
                "id": "Modesty",
                "name": "Modesty",
                "category": "personality",
                "percentage": 0.5024715865936059,
                "sampling_error": 0.04250152748
            },
            {
                "id": "Morality",
                "name": "Uncompromising",
                "category": "personality",
                "percentage": 0.8156354098558759,
                "sampling_error": 0.04948514136
            },
            {
                "id": "Sympathy",
                "name": "Sympathy",
                "category": "personality",
                "percentage": 0.8524456662380361,
                "sampling_error": 0.08274443508
            },
            {
                "id": "Trust",
                "name": "Trust",
                "category": "personality",
                "percentage": 0.7731980703870448,
                "sampling_error": 0.04369074388
            }
        ]
    }
];

let color = d3.scale.ordinal()
              .range(["#EDC951","#CC333F","#00A0B0"]);

// this component will render differently when called by the webapp formcontainer or by a direct URL link.
// when called by formcontainer, it should push the route with the UUID that we send back from server as the pathname
// when called from direct URL link, we should pull the ID parameter and query the database in componentWillMount

export default class StaticResults extends Component {
    static contextTypes = {
        mobile: React.PropTypes.bool
    }

    state = {
        activeTab: 1
    }

    setActiveTab = (activeTab) => {
        this.setState({activeTab});
    }

    componentDidMount() {
        let self = this;
        const id = this.props.params.id;

        const fetchHeaders = new Headers();

        fetchHeaders.append("Content-Type", "application/json");

        const httpOptions = {
            method: "GET",
            headers: fetchHeaders,
            mode: "cors"
        };

        const fetchReq = new Request("/results/" + id, httpOptions);

        fetch(fetchReq, httpOptions)
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({data: data.watsonData});
                }, function (err) {
                    console.log("error", err);
                });
            }).catch(function (err) {
                console.log("FETCH ERROR", err);
            });
    }

    render() {
        return (
            <Layout classnames='Results'>
                <main className="main">
                    <User ico={USER.ico} name={USER.name}/>
                    <SectionHat title="Trait report"
                                descr="123123 words analysed. "
                                span="Very Strong Analysis"/>
                    <Tabs tabs={TABS} active={this.state.activeTab} onChange={this.setActiveTab}/>
                </main>
                <Traits list={TRAITS} />
                <BehaviorReport />
            </Layout>
        );
    }
}
