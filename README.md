# react-responsive-media

A React Container Component to manage the behavior of your Responsive Components in your Application


## Usage

In your react-browserify application you can install `react-responsive-container` with:
```$ npm install --save react-responsive-container```

Then you can wrap the component you want to have the responsive behavior

```
var ResponsiveContainer = require('react-responsive-container');

var mediaQueries = {
  small: 400,
  medium: 768,
  large: 1024,
  full: Infinity
};

<ResponsiveContainer
  mq={mediaQueries}>
  <YourComponent />
</ResponsiveContainer>
```

from now on `YourComponent` will have an additional prop: `currentMedia` that is an Object in the format:
```
{
  small: false,
  medium: false,
  large: false,
  full: true
}
```

This Object will be automatically updated as your actual media changes.


## mediaQueries

For additional info on how to format your `mediaQuery` Object please refer to [mediaquery](https://github.com/axyz/mediaquery) syntax specifications


## flux

We strongly advice you to follow the [flux guidelines](https://facebook.github.io/flux/docs/overview.html) with this component.

Basically you should make your root component wrapped inside the `ResponsiveContainer` and then pass `currentMedia` as a prop only to the children that needs to have a responsive behavior

e.g.

`ResponsiveRootComponent`
```
class ResponsiveRootComponent extends React.Component {
  render () {
    return (
      <ResponsiveContainer mq={mediaQueries}>
        <RootComponent />
      </ResponsiveContainer>
    );
  }
}
```

`RootComponent.jsx`
```
class RootComponent extends React.Component {
  render () {
    return <Children currentMedia={this.props.currentMedia} />;
  }
}
```
