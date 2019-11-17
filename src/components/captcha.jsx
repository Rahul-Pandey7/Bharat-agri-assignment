import React, { Component } from "react";
import { ReCaptcha } from "react-recaptcha-google";
class ExampleComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
  }
  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  render() {
    return (
      <div>
        <ReCaptcha
          ref={el => {
            this.captchaDemo = el;
          }}
          size="normal"
          data-theme="dark"
          render="explicit"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}
export default ExampleComponent;
