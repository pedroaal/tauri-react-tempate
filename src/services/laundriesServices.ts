import { useQuery } from "@tanstack/react-query"

import supabase from "~/utils/supabase"

export const getLaundries = () =>
  useQuery({
    queryKey: ["laundries"],
    queryFn: async () => {
      const { data } = await supabase.from("laundries").select()
      return data
    },
  })
