import PropTypes from 'prop-types';
import React from 'react';
import Area from '../../../../../../lib/components/Area';
import { useAppState } from '../../../../../../lib/context/app';
import { get } from '../../../../../../lib/util/get';
import { Field } from '../../../../../../lib/components/form/Field';
import { Card } from '../../Card';
import Ckeditor from '../../../../../../lib/components/form/fields/Ckeditor';

export default function General({
  browserApi, deleteApi, uploadApi, folderCreateApi
}) {
  const context = useAppState();
  const fields = [
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'name',
        name: 'name',
        label: 'Name',
        placeholder: 'Name',
        validationRules: ['notEmpty']
      },
      sortOrder: 10,
      id: 'name'
    },
    {
      component: { default: Field },
      props: {
        id: 'cms_page_id',
        name: 'cms_page_id',
        type: 'hidden'
      },
      sortOrder: 10,
      id: 'cms_page_id'
    },
    {
      component: { default: Field },
      props: {
        type: 'radio',
        id: 'status',
        name: 'status',
        label: 'Status',
        options: [{ value: 0, text: 'Disabled' }, { value: 1, text: 'Enabled' }]
      },
      sortOrder: 20,
      id: 'status'
    },
    {
      component: { default: Ckeditor },
      props: {
        id: 'content',
        name: 'content',
        label: 'Content',
        browserApi,
        deleteApi,
        uploadApi,
        folderCreateApi
      },
      sortOrder: 30,
      id: 'content'
    }
  ].filter((f) => {
    // eslint-disable-next-line no-param-reassign
    if (get(context, `page.${f.props.name}`) !== undefined) { f.props.value = get(context, `page.${f.props.name}`); }
    return f;
  });

  return (
    <Card title="General">
      <Card.Session>
        <Area id="page-edit-general" coreComponents={fields} />
      </Card.Session>
    </Card>
  );
}

General.propTypes = {
  browserApi: PropTypes.string.isRequired,
  deleteApi: PropTypes.string.isRequired,
  folderCreateApi: PropTypes.string.isRequired,
  uploadApi: PropTypes.string.isRequired
};
