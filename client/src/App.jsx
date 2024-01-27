import { createBrowserRouter, RouterProvider } from "react-router-dom"



// erros 
import {
  NotFound,
  Error
} from "./errors"

// private
import ProtectedAuth from "./private/ProtectedAuth";

// react query setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// skeleoton
import { SkeletonTheme } from "react-loading-skeleton";

// pages
import {
  DashboardLayout,
  ProfileHome,
  PostsPage,
  Login,
  AddPost,
  MyProfile,
  HomeLayout,
  NewPost,
  SinglePost,
  AuthorLayout,
  AuthorPosts,
  AboutAuthor,
  SearchPage,
  TagsPage,
  CatePage,
  // Settings
} from "./content/pages";



const router = createBrowserRouter([
  // *************HOME*****************
  {
    path: "/",
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <PostsPage />
      },
      {
        path: "/new_post",
        element: <ProtectedAuth isExist={false}><NewPost /></ProtectedAuth>
      },
      {
        path: "/posts/:postSlug",
        element: <SinglePost />,
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
  {
    path: "/my_profile",
    errorElement: <Error />,
    element: <ProtectedAuth isExist={false}  ><DashboardLayout /></ProtectedAuth>,
    children: [
      {
        index: true,
        element: <ProfileHome />
      },
      {
        path: "/my_profile/profile_info",
        element: <MyProfile />,
      },
      {
        path: "/my_profile/write_post",
        element: <AddPost />,
      },
      // {
      //   path: "/my_profile/edit_post/:id",
      //   element: <EditPost />,
      // },
      // {
      //   path: "/my_profile/my_posts",
      //   element: <AllPosts />,
      // },
      // {
      //   path: "/my_profile/settings",
      //   element: <Settings />,
      // },
    ]
  },

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

  const twentyFourHoursInMs = 1000 * 60 * 60 * 24
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc" >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SkeletonTheme>
  )
};

export default App;
