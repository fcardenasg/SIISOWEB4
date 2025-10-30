import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import SubCard from 'ui-component/cards/SubCard';

const ExtractingInformation = () => {
    const rows = 4;

    return (
        <SubCard>
            <Skeleton variant="rounded" width={250} height={30} sx={{ mb: 2 }} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Skeleton width={80} height={20} /></TableCell>
                        <TableCell><Skeleton width={50} height={20} /></TableCell>
                        <TableCell><Skeleton width={100} height={20} /></TableCell>
                        <TableCell><Skeleton width={150} height={20} /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1, display: 'inline-block' }} />
                                <Skeleton width={150} height={20} sx={{ display: 'inline-block' }} />
                            </TableCell>
                            <TableCell><Skeleton width={60} height={20} /></TableCell>
                            <TableCell><Skeleton width={20} height={20} /></TableCell>
                            <TableCell><Skeleton width={200} height={20} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={rows}
                page={0}
                onPageChange={() => { }}
                rowsPerPage={rows}
                onRowsPerPageChange={() => { }}
                labelRowsPerPage={<Skeleton width={80} height={20} />}
                labelDisplayedRows={() => <Skeleton width={100} height={20} />}
                SelectProps={{
                    renderValue: () => <Skeleton width={20} height={20} />,
                }}
                ActionsComponent={() => (
                    <>
                        <Skeleton width={20} height={20} sx={{ mx: 0.5 }} />
                        <Skeleton width={20} height={20} sx={{ mx: 0.5 }} />
                    </>
                )}
            />
        </SubCard>
    );
};

export default ExtractingInformation;