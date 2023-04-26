import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

const UserTable = ({rows, deleteRow}) => {
  
  // received rows from context
  const appContext = useContext(AppContext);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.job}</TableCell>
                <TableCell>
                  <Button value={row.id} onClick={e => deleteRow(e.target.value)}>Delete call</Button>
                  <Button onClick={() => deleteRow(row.id)}>Delete call (better way)</Button>
                  {/* don't or avoid */}
                  {/* <Button onClick={() => users = users.filter(user => user.id != row.id)}>Delete function</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>{appContext.rowsFromContext?.length} rows from context</p>
    </>
  );
}
export default UserTable;