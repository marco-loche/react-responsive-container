var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var MediaQuery = require('mediaquery');
var MatchMedia = window.matchMedia;
var ResponsiveContainer = React.createClass({
  getInitialState: function () {
    var mediaQuery = MediaQuery.asArray(this.props.mq);

    return {
      currentMedia: mediaQuery
        .reduce((prev, next, index, array) => {
          prev[next[0]] = index === array.length;
          return prev;
        }, {})
    };
  },

  componentDidMount: function () {
    this.updateMediaQueries();
    var mq = MediaQuery.asArray(this.props.mq);

    Object.keys(mq).forEach(q => {
      MatchMedia(mq[q]).addListener(() => {
        this.updateMediaQueries();
      });
    });
  },

  updateMediaQueries: function () {
    var mq = MediaQuery.asArray(this.props.mq);

    this.setState({
      currentMedia: mq
        .reduce((prev, next) => {
          prev[next[0]] = MatchMedia(next[1]).matches;
          return prev;
        }, {})
    });
  },

  render: function () {
    return cloneWithProps(React.Children.only(this.props.children), {
      currentMedia: this.state.currentMedia
    });
  }
});

module.exports = ResponsiveContainer;
