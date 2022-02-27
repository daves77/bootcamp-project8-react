import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import Page from '../components/Page';


export default function Create() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<Page title='Closed Land | Create'>
			<Container>
				<Typography variant='h2' sx={{ ml: -1 }}>
					Create New NFT 🛠
				</Typography>
				<Typography variant='subtitle2'>
					Personalize and upload your very own NFT collection!
				</Typography>

				<Grid container spacing={3} sx={{ mt: 4, pl: 3 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid item xs={12}>
							<Typography variant='h4' sx={{ mb: 2 }}>
								Upload your masterpiece
							</Typography>
							<input {...register('image')} type='file' />
						</Grid>
						<Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
							<TextField
								variant='outlined'
								label='name'
								{...register('name')}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
							<TextField
								variant='outlined'
                multiline
								label='Description'
                placeholder='test'
                minRows={4}
								{...register('description')}
							/>
						</Grid>
						<Button variant='contained' type='submit'>
							Create
						</Button>
					</form>
				</Grid>
			</Container>
		</Page>
	);
}
