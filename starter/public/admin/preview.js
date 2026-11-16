/* Custom Sveltia CMS previews.
 * Templates render current editor values as site-like previews.
 * The deployed Astro page remains the source of truth for responsive QA.
 */
const PreviewShell = (content, siteName = 'Company Name', navLabels = ['About', 'Services', 'Blog', 'Contact']) =>
  h('div', { className: 'preview-site' },
    h('header', { className: 'preview-header' },
      h('strong', {}, siteName),
      h('nav', {}, navLabels.map((label) => h('span', {}, label)))
    ),
    h('main', { className: 'preview-main' }, content),
    h('footer', { className: 'preview-footer' }, `${siteName} · Site preview`)
  );

const renderSection = (section, index, getAsset) => {
  const imageAsset = section.image ? getAsset(section.image) : null;
  const image = imageAsset
    ? h('img', { className: 'preview-image', src: imageAsset.url, alt: section.image_alt || '' })
    : null;
  const heading = section.heading
    ? h(section.type === 'hero' ? 'h1' : 'h2', {}, section.heading)
    : null;
  const body = section.body ? h('p', {}, section.body) : null;
  const eyebrow = section.eyebrow ? h('p', { className: 'preview-eyebrow' }, section.eyebrow) : null;
  const button = section.button_label && section.button_url
    ? h('span', { className: 'preview-button' }, section.button_label)
    : null;
  const items = Array.isArray(section.items) ? section.items : [];

  if (section.type === 'image_text' || (section.type === 'hero' && image)) {
    return h('section', { className: `preview-section ${section.type === 'hero' ? 'preview-hero-layout' : 'preview-image-text'}`, key: index },
      h('div', {}, eyebrow, heading, body, button), image);
  }
  if (section.type === 'feature_grid') {
    return h('section', { className: 'preview-section', key: index }, heading, body,
      h('div', { className: 'preview-feature-grid' }, items.map((item, itemIndex) =>
        h('article', { className: 'preview-feature-card', key: itemIndex }, h('h3', {}, item.title), item.body ? h('p', {}, item.body) : null)
      ))
    );
  }
  if (section.type === 'faq') {
    return h('section', { className: 'preview-section', key: index }, heading, body,
      h('div', { className: 'preview-faq-list' }, items.map((item, itemIndex) =>
        h('details', { key: itemIndex }, h('summary', {}, item.title), item.body ? h('p', {}, item.body) : null)
      ))
    );
  }
  if (section.type === 'cta') {
    return h('section', { className: 'preview-section preview-cta', key: index }, heading, body, button);
  }
  if (section.type === 'hero') {
    return h('section', { className: 'preview-section preview-hero-layout', key: index },
      h('div', {}, eyebrow, heading, body, button), image);
  }
  return h('section', { className: 'preview-section', key: index }, image, eyebrow, heading, body, button);
};

const PagePreview = createClass({
  render: function () {
    const { entry, getAsset, widgetFor } = this.props;
    const title = entry.getIn(['data', 'title']) || 'Untitled page';
    const description = entry.getIn(['data', 'description']);
    const mode = entry.getIn(['data', 'content_mode']) || 'blocks';
    const sections = entry.getIn(['data', 'sections']);
    const sectionData = sections && sections.toJS ? sections.toJS() : [];
    const content = [
      ...(sectionData.length === 0 && mode === 'blocks'
        ? [h('div', { className: 'preview-page-heading', key: 'heading' }, h('h1', {}, title), description ? h('p', {}, description) : null)]
        : []),
      ...(mode === 'blocks'
        ? sectionData.map((section, index) => renderSection(section, index, getAsset))
        : [h('article', { className: 'preview-body', key: 'body' }, widgetFor('body'))])
    ];
    return PreviewShell(content);
  }
});

const ServicePreview = createClass({
  render: function () {
    const { entry, getAsset, widgetFor } = this.props;
    const title = entry.getIn(['data', 'title']) || 'Service title';
    const description = entry.getIn(['data', 'description']);
    const imagePath = entry.getIn(['data', 'featured_image']);
    const imageAsset = imagePath ? getAsset(imagePath) : null;
    return PreviewShell(
      h('article', { className: 'preview-article' },
        h('small', { className: 'preview-eyebrow' }, 'OUR SERVICES'),
        h('h1', {}, title),
        description ? h('p', { className: 'preview-lead' }, description) : null,
        imageAsset ? h('img', { className: 'preview-featured-image', src: imageAsset.url, alt: entry.getIn(['data', 'featured_image_alt']) || '' }) : null,
        h('div', { className: 'preview-body' }, widgetFor('body'))
      )
    );
  }
});

const PostPreview = createClass({
  render: function () {
    const { entry, getAsset, widgetFor } = this.props;
    const title = entry.getIn(['data', 'title']) || 'Article title';
    const excerpt = entry.getIn(['data', 'excerpt']);
    const author = entry.getIn(['data', 'author']);
    const date = entry.getIn(['data', 'published_at']);
    const imagePath = entry.getIn(['data', 'featured_image']);
    const imageAsset = imagePath ? getAsset(imagePath) : null;
    return PreviewShell(
      h('article', { className: 'preview-article preview-post' },
        h('small', { className: 'preview-eyebrow' }, entry.getIn(['data', 'category']) || 'BLOG'),
        imageAsset ? h('img', { className: 'preview-featured-image', src: imageAsset.url, alt: entry.getIn(['data', 'featured_image_alt']) || '' }) : null,
        h('h1', {}, title),
        excerpt ? h('p', { className: 'preview-lead' }, excerpt) : null,
        h('div', { className: 'preview-meta' }, [author, date].filter(Boolean).join(' · ')),
        h('div', { className: 'preview-body' }, widgetFor('body'))
      )
    );
  }
});

const GeneralSettingsPreview = createClass({
  render: function () {
    const { entry, getAsset } = this.props;
    const value = (key) => entry.getIn(['data', key]);
    const logo = value('logo') ? getAsset(value('logo')) : null;
    const ogImage = value('default_og_image') ? getAsset(value('default_og_image')) : null;
    const socialLinks = entry.getIn(['data', 'social_links']);
    const links = socialLinks && socialLinks.toJS ? socialLinks.toJS() : [];
    const contact = [
      value('phone') && h('p', {}, `Phone: ${value('phone')}`),
      value('email') && h('p', {}, `Email: ${value('email')}`),
      value('address') && h('p', {}, `Address: ${value('address')}`)
    ].filter(Boolean);
    return h('div', { className: 'preview-settings' },
      h('header', { className: 'preview-settings-header' },
        logo ? h('img', { src: logo.url, alt: value('site_name') || 'Logo' }) : h('strong', {}, value('site_name') || 'Site name'),
        h('span', {}, value('language') || 'en')
      ),
      h('main', { className: 'preview-settings-main' },
        h('p', { className: 'preview-eyebrow' }, 'SITE IDENTITY'),
        h('h1', {}, value('site_name') || 'Site name'),
        value('tagline') && h('p', { className: 'preview-lead' }, value('tagline')),
        value('default_description') && h('p', {}, value('default_description')),
        h('section', {}, h('h2', {}, 'Contact details'), ...contact),
        links.length > 0 && h('section', {}, h('h2', {}, 'Social links'), h('div', { className: 'preview-social-links' }, links.map((link, index) => h('span', { key: index }, link.label, ' · ', link.url)))),
        ogImage && h('section', {}, h('h2', {}, 'Default Open Graph image'), h('img', { className: 'preview-og-image', src: ogImage.url, alt: 'Open Graph preview' })),
        h('small', {}, value('footer_note') || '')
      )
    );
  }
});

const NavigationPreview = createClass({
  render: function () {
    const { entry } = this.props;
    const items = entry.getIn(['data', 'items']);
    const navItems = items && items.toJS ? items.toJS() : [];
    return h('div', { className: 'preview-settings' },
      h('header', { className: 'preview-settings-header' }, h('strong', {}, 'Main navigation')),
      h('main', { className: 'preview-settings-main' },
        h('h1', {}, 'Navigation preview'),
        h('nav', { className: 'preview-navigation-list' }, navItems.map((item, index) =>
          h('div', { key: index }, h('strong', {}, item.label || 'Untitled link'), h('span', {}, item.url || '#'), item.external ? h('small', {}, 'External link') : null)
        ))
      )
    );
  }
});

CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('services', ServicePreview);
CMS.registerPreviewTemplate('posts', PostPreview);
CMS.registerPreviewTemplate('general', GeneralSettingsPreview);
CMS.registerPreviewTemplate('navigation', NavigationPreview);
CMS.registerPreviewStyle('/admin/preview.css');
