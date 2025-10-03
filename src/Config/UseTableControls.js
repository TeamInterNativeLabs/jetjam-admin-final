import { useState } from "react";

const UseTableControls = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [showItem, setShowItem] = useState(10);

    const [filterSort, setFilterSort] = useState(false);
    const [filterSortValue, setFilterSortValue] = useState('All');
    const [filterSortValues, setFilterSortValues] = useState([]);

    const [filterSearch, setFilterSearch] = useState(false);
    const [filterSearchValue, setFilterSearchValue] = useState('');

    const [dateFilter, setDateFilter] = useState(false);
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');
    return {
        showFilter, setShowFilter, showItem, setShowItem, filterSort, setFilterSort, filterSortValue, setFilterSortValue, filterSortValues, setFilterSortValues, filterSearch, setFilterSearch, filterSearchValue, setFilterSearchValue, dateFilter, setDateFilter, filterFrom, setFilterFrom, filterTo, setFilterTo
    }

}

export default UseTableControls