"use client"

import Todos from "@/components/Todos";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
          <QueryClientProvider client={queryClient}>
                  <Todos/>
          </QueryClientProvider>
  );
}
