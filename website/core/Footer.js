/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('doc1.html', this.props.language)}>
              Knowledge Base
            </a>
            <a href={this.docUrl('blog', this.props.language)}>
              News
            </a>
            <a href={this.docUrl('doc4.html', this.props.language)}>
              ADRs
            </a>
          </div>
          <div>
            <h5>Let's build a a community</h5>
            <a
              href="https://twitter.com/search?l=&q=%23d10l%20since%3A2018-07-07&src=typd"
              target="_blank"
              rel="noreferrer noopener">
              Disucss using #d10l 
            </a>
            <a
              href="https://twitter.com/denseidel"
              target="_blank"
              rel="noreferrer noopener">
              Contact me @denseidel 
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/denseidel">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
