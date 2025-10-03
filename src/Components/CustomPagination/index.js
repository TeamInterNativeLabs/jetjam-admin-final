import './style.css';

const CustomPagination = ({ length, itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (length > 0) {
    return (
      <div className="paginationBar align-items-center">
        <p>Showing  {((currentPage - 1) * itemsPerPage) + length} out of {totalItems} Entries</p>
        <ul>
          <li><button onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1)
            }
          }}>Prev</button></li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} >
              <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li><button onClick={() => {
            if (currentPage < pageNumbers.length) {
              onPageChange(currentPage + 1)
            }
          }}>Next</button></li>
        </ul>
      </div>
    );
  }

  return null

};

export default CustomPagination;

