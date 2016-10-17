import React, { Component } from 'react'
import Layout from './Layout';

class FormUserTextInput extends Component {
  state = {
    integrationTextActive: false
  };

  render() {

    return (
      <Layout classnames='Home'>
        <div id='info'>
          <div className='infoheader'>
            <div className='header-primary'>
              YOUR INFO
            </div>
            <div className='header-secondary'>
              Small text small text small text
            </div>
          </div>
          <div className='integrations-sm cf'>
            <div className='integration-sm integration-sm-fb'>
              CONNECT FACEBOOK
            </div>
            <div className='integrated'>CHECKICON</div>

            <div className='integration-sm integration-sm-tw integration-sm-integrated'>
              CONNECT TWITTER
            </div>
            <div className='integrated'>CHECKICON</div>
          </div>

          <div className='info-email valid'>
            <input type='text' placeholder='E-mail:' />
          </div>

          <div>OR</div>

          <div className={'integration-text' + this.state.integrationTextActive? 'active' : 'inactive'}>
            <div className='integration-text-cta'>
              Upload text
            </div>
            <textarea className='integration-text-input'></textarea>
          </div>

          <div className='analyze'>
            ANALYZE
          </div>
        </div>
      </Layout>
    )
  }

}
export default FormUserTextInput;
