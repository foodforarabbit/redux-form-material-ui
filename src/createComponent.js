import { Component, createElement } from 'react'
import { isStateLess } from './utils';

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component
    }

    allowClickEventOnInputButton = (onBlur) => (event) => {
      const { relatedTarget } = event;
      if (relatedTarget && relatedTarget.getAttribute('type') === 'button') {
        event.preventDefault();
      } else if (onBlur) {
        onBlur(event);
      }
    }

    render() {
      const propsToMap = {
        ...this.props
      };
      if (propsToMap.input && propsToMap.input.onBlur) {
        propsToMap.input.onBlur = this.allowClickEventOnInputButton(propsToMap.input.onBlur);
      }

      return createElement(MaterialUIComponent, {
        ...mapProps(propsToMap),
        ref: (!isStateLess(MaterialUIComponent) ? el => this.component = el : null)
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}
