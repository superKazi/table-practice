import { useEffect } from 'react';
import { useQuery } from 'react-query';
import './App.css';

function App() {
  const { isLoading, isError, data, error } = useQuery('users', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <table>
      <caption>election results table</caption>
      <thead>
        <tr>
          {Object.keys(data[0]).map((k, i) => {
            if (i > 0) {
              return (
                <th scope="col" key={k}>
                  {k}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => {
          if (i > 0) {
            return (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.username}</td>
                <td>{d.email}</td>
                <td>
                  {d.address.street}, {d.address.city} {d.address.suite}
                </td>
                <td>{d.phone}</td>
                <td>{d.website}</td>
                <td>{d.company.name}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}

export default App;
