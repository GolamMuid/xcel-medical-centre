import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
