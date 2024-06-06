/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "components/ui/alert-dialog";
import React from "react";

export interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean, isSuccess?: boolean) => void;
    action: null | (() => Promise<any>);
}
  export default function Confirm(props: AlertDialogProps) {
    const [loading, setLoading] = React.useState(false);
    return (
      <AlertDialog {...props}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xoá?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác sau khi thực hiện!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={() => {
                setLoading(true);
                props?.action && props.action().then(() => {
                    setLoading(false);
                    props.onOpenChange(false, true);
                })
            }}>Tiếp tục</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  