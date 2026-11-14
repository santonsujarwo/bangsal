/* Custom Sveltia CMS previews.
 * These templates render the current editor values as a site-like page.
 * The deployed page remains the source of truth for final responsive QA.
 */
const PreviewShell = (content) =>
  h('div', { className: 'preview-site' },
    h('header', { className: 'preview-header' },
      h('strong', {}, 'Company Name'),
      h('nav', {}, h('span', {}, 'About'), h('span', {}, 'Services'), h('span', {}, 'Blog'), h('span', {}, 'Contact'))
    ),
    h('main', { className: 'preview-main' }, content),
    h('footer', { className: 'preview-footer' }, 'Company Name · Site preview')
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

  if (section.type === 'image_text') {
    return h('section', { className: 'preview-section preview-image-text', key: index }, image,
      h('div', {}, eyebrow, heading, body, button));
  }
  if (section.type === 'cta') {
    return h('section', { className: 'preview-section preview-cta', key: index }, heading, body, button);
  }
  if (section.type === 'hero') {
    return h('section', { className: 'preview-section preview-hero', key: index }, eyebrow, heading, body, button);
  }
  return h('section', { className: 'preview-section', key: index }, image, eyebrow, heading, body, button);
};

const PagePreview = createClass({
  render: function () {
    const { entry, getAsset, widgetFor } = this.props;
    const title = entry.getIn(['data', 'title']) || 'Untitled page';
    const description = entry.getIn(['data', 'description']);
    const sections = entry.getIn(['data', 'sections']);
    const sectionData = sections && sections.toJS ? sections.toJS() : [];
    const content = [
      ...(sectionData.length === 0 ? [h('div', { className: 'preview-page-heading', key: 'heading' }, h('h1', {}, title), description ? h('p', {}, description) : null)] : []),
      ...sectionData.map((section, index) => renderSection(section, index, getAsset)),
      h('article', { className: 'preview-body', key: 'body' }, widgetFor('body'))
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

CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('services', ServicePreview);
CMS.registerPreviewTemplate('posts', PostPreview);
CMS.registerPreviewStyle('/admin/preview.css');
