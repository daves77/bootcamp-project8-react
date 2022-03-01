import { useContext } from 'react';
import { Alert, AlertTitle, CircularProgress, Grid } from '@mui/material';

import { Context } from '../store';

export default function Notification() {
	const { store, dispatch } = useContext(Context);
	const {notification} = store
	return (
		<>
			{notification && notification.message && (
				<Alert
					severity={notification.status}
					sx={{ width: 250, verticalAlign: 'top', textAlign: 'left' }}>
            <Grid container spacing={1}>
		<Grid item sm={9}>
						<AlertTitle>{notification.status}</AlertTitle>
						{notification.message}
					</Grid>
					<Grid item sm={3}>
						{notification.status === 'info' && (
							<CircularProgress color='inherit' />
						)}
					</Grid>
            </Grid>
			
				</Alert>
			)}
		</>
	);
}
