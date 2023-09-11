import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Homepage from "../pages/homepage/Homepage";
import ServicePage from "../pages/adminPages/ServicePage";
import LoginPage from "../pages/login/LoginPage";
import SliderPage from "../pages/adminPages/SliderPage";
import AboutPage from "../pages/adminPages/AboutPage";
import PhotosPage from "../pages/adminPages/PhotosPage";
import VideosPage from "../pages/adminPages/VideosPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <ErrorPage />,
	},
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		element: (
			<PrivateRoute>
				<Main />
			</PrivateRoute>
		),
		children: [
			{
				path: "/services",
				element: <ServicePage />,
			},
			{
				path: "/sliders",
				element: <SliderPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/photos",
				element: <PhotosPage />,
			},
			{
				path: "/videos",
				element: <VideosPage />,
			},
		],
	},
]);

export default router;
