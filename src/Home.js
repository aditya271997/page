import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      list: null,
    };
  }
  componentDidMount() {
    fetch('https://reqres.in/api/users?page=2').then((response) => {
      response.json().then((result) => {
        this.setState({ list: result.data });
      });
    });
  }

  render() {
    const { list } = this.state;
    console.log('---item --', list);
    let i = 1;
    return (
      <div className='text-center'>
        <h1>Users List</h1>
        <Table responsive='md'>
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
            {!!list &&
              list.map((item) => (
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
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
