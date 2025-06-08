import { CollectionConfig } from 'payload';

const GalleryCategories: CollectionConfig = {
  slug: 'gallery-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Gallery', // Group under 'Gallery' in the admin sidebar
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // If you need multi-language support
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true, // Usually generated automatically
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) {
              return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            }
            if (data?.title) {
              return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            }
            return value;
          },
        ],
      },
    },
  ],
};

export default GalleryCategories;