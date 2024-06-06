import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import CreateOrEdit from "CreateOrEdit";
import Spin from "components/ui/Spin";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { debounce } from "lodash";
import {
    Language,
  LanguageResponse,
  QueryParams,
  deleteLanguage,
  fetchLanguages,
} from "lib/service";
import React from "react";
import Confirm, { AlertDialogProps } from "Confirm";
import { PaginationDemo } from "Pagination";

const LanguageTable = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [detail, setDetail] = React.useState<Language>();
  const [confirmData, setConfirmData] = React.useState<
    Omit<AlertDialogProps, "onOpenChange">
  >({
    open: false,
    action: () => Promise.resolve(),
  });
  const handleDelete = (id: string) => {
    setConfirmData({
      ...confirmData,
      open: true,
      action: () => deleteLanguage(id),
    });
  };
  const [data, setData] = React.useState<LanguageResponse>();
  const [query, setQuery] = React.useState<QueryParams>({
    page: 1,
    limit: 10,
    search: "",
  });
  React.useEffect(() => {
      setDetail(undefined);
    fetchData(query);
    return () => {
        setDetail(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = React.useCallback(
    debounce((query: QueryParams) => {
      setLoading(true);
      fetchLanguages(query)
        .then(setData)
        .finally(() => {
          setLoading(false);
        });
    }, 500),
    []
  );
  const handleSearch = (value: string) => {
    setQuery({ page: 1, limit: 10, search: value });
  };
  const handleOpenChange = (open: boolean, type?: boolean) => {
    setOpen(open);
    if (type) {
      setQuery({ page: 1, limit: 10, search: "" });
    }
  };
  const handleConfirmOpenChange = (open: boolean, type?: boolean) => {
    setConfirmData({ ...confirmData, open });
    if (type) {
      setQuery({ page: 1, limit: 10, search: "" });
    }
  };

  return (
    <>
      {open && <CreateOrEdit open={open} langData={detail} onOpenChange={handleOpenChange} />}
      <Confirm {...confirmData} onOpenChange={handleConfirmOpenChange} />
      <div className="tw-w-full tw-bg-white tw-p-4">
        <div className="tw-flex tw-justify-between tw-py-4">
          <Input
            placeholder="Tìm kiếm..."
            onChange={(event) => handleSearch(event.target.value)}
            className="max-w-sm"
            value={query.search}
          />
          <Button
            variant="outline"
            className="tw-bg-blue-500 tw-text-white"
            onClick={() => {
                setDetail(undefined);
                setOpen(true);
            }}
          >
            Thêm mới
          </Button>
        </div>
        <div className="tw-rounded-md tw-border">
          {isLoading ? (
            <Spin />
          ) : (
            <Table className="tw-bg-white tw-p-3 tw-rounded">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="tw-w-[120px]">Key</TableHead>
                  <TableHead>Tiếng Anh</TableHead>
                  <TableHead>Tiếng Việt</TableHead>
                  <TableHead className="tw-text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="tw-font-medium">
                      {item.language_key}
                    </TableCell>
                    <TableCell>{item.language_en}</TableCell>
                    <TableCell>{item.language_vn}</TableCell>
                    <TableCell className="tw-text-right">
                      <div className="tw-space-x-2">
                        <Button
                          variant="ghost"
                          title="Sửa"
                            onClick={
                                () => {
                                    setDetail(item);
                                    setOpen(true);
                                }
                            }
                        >
                          <EditOutlined className="tw-text-xl" />
                        </Button>
                        <Button title="Xoá" variant="ghost">
                          <DeleteFilled
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className="tw-text-red-600 tw-text-xl"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4">
            <div>
                <PaginationDemo page={data?.page || 0} limit={10} totalData={data?.total || 0} onPageChange={(page) => 
                    setQuery({...query, page})
                }/>
            </div>
        </div>
      </div>
    </>
  );
};

export default LanguageTable;
