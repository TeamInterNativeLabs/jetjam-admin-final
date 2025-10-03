import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CustomFilters from "../CustomFilters";

import "./style.css";
import CustomButton from "../CustomButton";

const CustomTable = (props) => {
  return (
    <>
      <CustomFilters
        isFilterOpen={props?.isFilterOpen}

        filterSort={props?.filterSort}
        filterSortValue={props?.filterSortValue}
        setFilterSortValue={props?.setFilterSortValue}
        filterSortValues={props?.filterSortValues}

        filterSearch={props?.filterSearch}
        filterSearchValue={props?.filterSearchValue}
        setFilterSearchValue={props?.setFilterSearchValue}

        dateFilter={props?.dateFilter}
        filterFrom={props?.filterFrom}
        setFilterFrom={props?.setFilterFrom}
        filterTo={props?.filterTo}
        setFilterTo={props?.setFilterTo}

        perPage={props?.perPage}
        perPageValues={props?.perPageValues}
        itemsPerPage={props?.itemsPerPage}
        setItemsPerPage={props?.setItemsPerPage}
      />
      {
        props?.buttonLabel && props?.onClickButton &&
        <div className="row mb-3 justify-content-end">
          <div className="col-3 d-flex justify-content-end">
            <CustomButton text={props?.buttonLabel || ""} onClick={props?.onClickButton} />
          </div>
        </div>
      }
      <div className="customTable">
        <table>
          <thead>
            <tr>
              {props?.headers.map((header) => (
                <th key={header.key}>
                  {/* {header.key !== 'id' ?
                    <div className="arrowTables">
                      <button><FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon> </button>
                      <button><FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon> </button>
                    </div>
                    : ''} */}
                  {header.title}</th>
              ))}
            </tr>
          </thead>
          {props?.length > 0 && props?.children}
        </table>
        {
          props?.length < 1 &&
          <div className="empty">
            <h3>No Data Found</h3>
          </div>
        }
      </div>

    </>
  );
};

export default CustomTable;
