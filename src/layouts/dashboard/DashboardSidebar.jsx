import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box,  Drawer, Typography, Avatar } from '@mui/material';
// mocks_
import account from '../../_mocks_/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { Context } from '../../store';
// ----------------------------------------------------------------------
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
	{
		title: 'marketplace',
		path: '/marketplace',
		icon: getIcon('eva:pricetags-fill'),
		authRequired: false,
	},
	{
		title: 'create',
		path: '/create',
		icon: getIcon('carbon:add-filled'),
		authRequired: true,
	},
	{
		title: 'trade',
		path: '/trade',
		icon: getIcon('eva:swap-fill'),
		authRequired: true,
	},
];

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
}));

const AccountStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
	const { pathname } = useLocation();
	const { store, dispatch } = useContext(Context);
	const { user } = store;

	const isDesktop = useResponsive('up', 'lg');

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

  const filteredSideBarConfig = sidebarConfig.filter(item => user !== null || !item.authRequired)

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': {
					height: 1,
					display: 'flex',
					flexDirection: 'column',
				},
			}}>
			<Box
				sx={{
					px: 2.5,
					py: 3,
					display: 'inline-flex',
					justifyContent: 'center',
				}}>
				<Logo />
			</Box>

			{user && (
				<Box sx={{ mb: 5, mx: 2.5 }}>
					<RouterLink  to='/user' style={{textDecoration: 'none'}}>
						<AccountStyle>
							<Avatar src={account.photoURL} alt='photoURL' />
							<Box sx={{ ml: 2 }}>
								<Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
									{user.name}
								</Typography>
							</Box>
						</AccountStyle>
					</RouterLink>
				</Box>
			)}

			<NavSection navConfig={filteredSideBarConfig} />

			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<RootStyle>
			{!isDesktop && (
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH },
					}}>
					{renderContent}
				</Drawer>
			)}

			{isDesktop && (
				<Drawer
					open
					variant='persistent'
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: 'background.default',
							borderRightStyle: 'dashed',
						},
					}}>
					{renderContent}
				</Drawer>
			)}
		</RootStyle>
	);
}
