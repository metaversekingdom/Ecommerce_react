/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Select } from '../../../../../lib/components/form/fields/Select';
import { useAppDispatch } from '../../../../../lib/context/app';

// TODO: make this list configurable
const sortingOptions = [{ code: 'price', name: 'Price' }, { code: 'name', name: 'Name' }];

export default function Sorting() {
  const AppContextDispatch = useAppDispatch();
  const [sortBy, setSortBy] = React.useState(() => {
    // Check if this is browser or server
    if (typeof window !== 'undefined') {
      let params = (new URL(document.location)).searchParams;
      return params.get("sortBy") || 'id';
    }
  });

  const [sortOrder, setSortOrder] = React.useState(() => {
    // Check if this is browser or server
    if (typeof window !== 'undefined') {
      let params = (new URL(document.location)).searchParams;
      return params.get("sortOrder") || 'asc';
    }
  });

  const onChangeSort = async (e) => {
    const currentUrl = window.location.href;
    e.preventDefault();
    const url = new URL(currentUrl, window.location.origin);
    url.searchParams.set('sortBy', e.target.value);
    url.searchParams.append('ajax', true);
    setSortBy(e.target.value);
    await AppContextDispatch.fetchPageData(url);
    url.searchParams.delete('ajax');
    history.pushState(null, "", url);
  };

  const onChangeDirection = async (e) => {
    const currentUrl = window.location.href;
    e.preventDefault();
    const url = new URL(currentUrl, window.location.origin);
    let order = sortOrder.toLowerCase() === 'asc' ? 'desc' : 'asc';
    url.searchParams.set('sortOrder', order);
    url.searchParams.append('ajax', true);
    setSortOrder(order);
    await AppContextDispatch.fetchPageData(url);
    url.searchParams.delete('ajax');
    history.pushState(null, "", url);
  };

  return (
    <div className="product-sorting mb-1">
      <div className="product-sorting-inner flex justify-end items-center space-x-05">
        <div><span>Sort By:</span></div>
        <div style={{ width: '160px' }}>
          <Select
            className="form-control"
            onChange={async (e) => await onChangeSort(e)}
            value={sortBy.toLowerCase()}
            options={[{
              value: '',
              text: 'Please select'
            }]
              .concat(sortingOptions.map((o) => ({ value: o.code, text: o.name })))}
          />
        </div>
        <div className="sort-direction self-center">
          <a onClick={(e) => onChangeDirection(e)} href="#">
            {sortOrder.toLowerCase() === 'desc' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-up"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-down"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: "rightColumn",
  sortOrder: 15
};
