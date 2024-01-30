import { createBrowserRouter, RouterProvider } from "react-router-dom"
import 'symbol-observable';

// erros 
import {
  NotFound,
  Error
} from "./errors"

// private
import ProtectedAuth from "./private/ProtectedAuth";

// react query setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// skeleoton
import { SkeletonTheme } from "react-loading-skeleton";

// pages
import {
  AboutAuthor,
  AuthorLayout,
  AuthorPosts,
  CatePage,
  HomeLayout,
  HomePage,
  HomePosts,
  Login,
  SearchPage,
  SinglePostPage,
  TagsPage
} from "./content/pages";
import { useState } from "react";

const router = createBrowserRouter([
  // *************HOME*****************
  {
    path: "/",
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/posts/:postSlug",
        element: <SinglePostPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/tags/:tag",
        element: <TagsPage />,
      },
      {
        path: "/category/:cate",
        element: <CatePage />,
      },
      {
        path: "/:authorName",
        element: <AuthorLayout />,
        children: [
          {
            index: true,
            element: <AuthorPosts />
          },
          {
            path: "/:authorName/about",
            element: <AboutAuthor />
          },
        ]
      },
    ]
  },


  // *************PROFILE (auth users) *****************


  // *************AUTH*****************
  {
    path: "/login",
    element: <ProtectedAuth isExist={true} ><Login /></ProtectedAuth>
  },

  // *************404*****************
  {
    path: "*",
    element: <NotFound />
  }
])



const App = () => {

  // const twentyFourHoursInMs = 1000 * 60 * 60 * 24
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //       refetchOnmount: false,
  //       refetchOnReconnect: false,
  //       retry: false,
  //       // staleTime: twentyFourHoursInMs,
  //     },
  //   },
  // });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );


  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc" >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SkeletonTheme>
  )
};

export default App;
