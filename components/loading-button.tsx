"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export function LoadingButton({ isLoading, children ,loadingText}: { isLoading: boolean, children: React.ReactNode,loadingText:string })  {
    return (
              <Button
          className="flex gap-1 items-center"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? loadingText : children}
        </Button>
    )
}