import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import './tableData.css';

export const TableData = () => {
  const handleFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((body) => {
        setData([...body.data]);
        setPageCount(body.total_pages);
        setisLoaded(true);
      })
      .catch((error) => console.error('Error', error));
  };

  useEffect(() => {
    handleFetch();
  }, []);
  const [hits, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  let i = 1;

  //   const URL = `https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`;
  const URL = `https://reqres.in/api/users?page=${currentPage}`;

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    handleFetch();
  };

  return (
    <div className='text-center'>
      <h1>Users List</h1>
      <Table responsive='lg'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            hits.map((item) => {
              console.log('---item--', item);
              return (
                <tr key={item.id}>
                  <td>{i++}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Image
                      width={64}
                      height={64}
                      className='mr-3'
                      key={item.id}
                      src={item.avatar}
                      roundedCircle
                      alt='Profile'
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <div></div>
          )}
        </tbody>
        {isLoaded ? (
          <div>
            <ReactPaginate
              pageCount={pageCount}
              pageRange={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'container'}
              previousLinkClassName={'page'}
              breakClassName={'page'}
              nextLinkClassName={'page'}
              pageClassName={'page'}
              disabledClassNae={'disabled'}
              activeClassName={'active'}
            />
          </div>
        ) : (
          <div className='text-center'>Nothing to display</div>
        )}
      </Table>
    </div>
  );
};
