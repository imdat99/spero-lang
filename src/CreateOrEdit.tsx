import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { Label } from "components/ui/label";
import { Language, createLanguage, updateLanguage } from "lib/service";
import React, { useEffect } from "react";
import Spin from "components/ui/Spin";

interface CreateOrEditProps {
  open: boolean;
  onOpenChange: (open: boolean, isSuccess?: boolean) => void;
  langData?: Language;
}
const CreateOrEdit: React.FC<CreateOrEditProps> = ({langData, ...props}) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Language>({
    id: "",
    language_key: "",
    language_en: "",
    language_vn: "",
  });
  useEffect(() => {
    if (langData) {
      setData(langData);
    } 
  }, [langData]);
    
  const handleAdd = () => {
    // Do something here
    if (!data.language_key || !data.language_en || !data.language_vn) {
      return;
    }
    setLoading(true);
    (langData ? updateLanguage : createLanguage)(data)
      .then(() => {
        props.onOpenChange(false, true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setData({
      ...data,
      [target.name]: target.value,
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {loading ? (
          <Spin />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{langData ? "Chỉnh sửa" : "Thêm mới"}</DialogTitle>
              <DialogDescription>
                Sau khi nhập đủ thông tin, Nhấn Lưu để thêm.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onChange={handleChange}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Key" className="text-right">
                  Key
                </Label>
                <Input
                  id="language_key"
                  className="col-span-3"
                  name="language_key"
                  value={data.language_key}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language_en" className="text-right">
                  Tiếng Anh
                </Label>
                <Textarea
                  id="language_en"
                  className="col-span-3"
                  value={data.language_en}
                  name="language_en"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language_vn" className="text-right">
                  Tiếng Việt
                </Label>
                <Textarea
                  id="language_vn"
                  name="language_vn"
                  value={data.language_vn}
                  className="col-span-3"
                />
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => props.onOpenChange(false)}>
                huỷ
              </Button>
              <Button type="submit" onClick={handleAdd}>
                Lưu
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrEdit;
