import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { useRef } from "react";

const CustomFilters = (props) => {

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleClear = () => {
    props?.setFilterTo('')
    props?.setFilterFrom('')
    if (fromRef.current) {
      fromRef.current.value = '';
    }
    if (toRef.current) {
      toRef.current.value = '';
    }
  }

  return (
    <>
      <div className="tableFilters">
        {
          props?.isFilterOpen &&
          <div className="row">
            <div className="col-xl-6 mb-2">
              {props?.dateFilter && (
                <div className="filterWrapper d-md-flex align-items-baseline gap-2">
                  <label className="filterLabel">Filter By:</label>
                  <div className="d-flex gap-3">
                    <input
                      type="date"
                      placeholder="From"
                      name="from"
                      className="filterInput"
                      value={props?.filterFrom}
                      max={props?.filterTo}
                      onChange={(event) => { props?.setFilterFrom(event.target.value) }}
                    />
                    <input
                      type="date"
                      placeholder="To"
                      name="to"
                      className="filterInput"
                      min={props?.filterFrom}
                      value={props?.filterTo}
                      onChange={(event) => { props?.setFilterTo(event.target.value) }}
                    />
                  </div>
                  <label className="clearLabel" onClick={handleClear}>Clear</label>
                </div>
              )}
            </div>
            <div className="col-xl-6 mb-2">
              {props?.filterSearch && (
                <div className="filterWrapper d-md-flex align-items-baseline justify-content-end gap-2">
                  <div className="searchWrapper">
                    <input
                      type="text"
                      placeholder="Search"
                      name="search"
                      className="filterInput searchInput"
                      value={props?.filterSearchValue}
                      onChange={(event) => { props?.setFilterSearchValue(event.target.value) }}
                    />
                    <button className="searchButton notButton">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-xl-6 mb-2">
              {/* {props?.filterSort && (
              <div className="filterWrapper d-md-flex align-items-baseline gap-2">
                <label className="filterLabel">Show:</label>
                <select className="filterInput"
                  onChange={(event) => { props?.setFilterTo(event.target.value) }}
                >
                  {props?.filterSortValues.map((item) => (
                    <option key={item.value} value={item.value}>Sort by {item.text}</option>
                  ))}
                </select>
              </div>
            )} */}
            </div>
            <div className="col-xl-6 mb-2 d-flex justify-content-xl-end gap-3">
              {props?.filterSort && (
                <div className="filterWrapper d-md-flex align-items-baseline justify-content-xl-end gap-2">
                  <label className="filterLabel">Sort By:</label>
                  <select className="filterInput"
                    value={props?.filterSortValue}
                    onChange={(event) => { props?.setFilterSortValue(event.target.value) }}
                  >
                    {props?.filterSortValues.map((item) => (
                      <option key={item.value} value={item.value}>Sort by {item.text}</option>
                    ))}
                  </select>
                </div>
              )}
              {props?.perPage && (
                <div className="filterWrapper d-md-flex align-items-baseline justify-content-xl-end gap-2">
                  <label className="filterLabel">Per Page</label>
                  <select className="filterInput"
                    value={props?.itemsPerPage}
                    onChange={(event) => { props?.setItemsPerPage(event.target.value) }}
                  >
                    {props?.perPageValues.map((item) => (
                      <option key={item.value} value={item.value}>{item.text}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default CustomFilters;




// filterSort
// filterSortValue
// setFilterSortValue

// filterSearch
// filterSearchValue
// setFilterSearchValue

// dateFilter
// filterFrom
// setFilterFrom
// filterTo
// setFilterTo
