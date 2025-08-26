import { getUserAPI } from '@/services/api';
import { dateRangeValidate } from '@/services/helper';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { render } from 'sass';

//hiệu ứng delay khi loading web
const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
//hiệu ứng delay khi loading web
const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

//---------------------------------------------

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: string;
}

const columns: ProColumns<IUserTable>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },

    {
        title: 'Id',
        dataIndex: "_id",
        hideInSearch: true,
        ellipsis: true,// Nội dung dài sẽ bị cắt

        render(dom, entity, index, action, schema) {
            return (
                <a href='#'>{entity._id}</a>
            )
        },
    },

    {
        title: 'FullName',
        dataIndex: "fullName"
    },

    {
        title: 'Email',
        dataIndex: "email",
        copyable: true,// Cho phép copy
    },

    {
        title: 'CreatedAt',
        dataIndex: "createdAt",
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },

    {
        title: 'CreatedAt',
        dataIndex: "createdAtRange",
        valueType: 'dateRange',
        hideInTable: true,
    },


    {
        title: 'Action',
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return (
                <>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: "pointer", marginRight: 15 }}
                    />

                    <DeleteTwoTone
                        twoToneColor="#ff4d4f"
                        style={{ cursor: "pointer" }}
                    />
                </>
            )
        },
    },
];

const TableUser = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(params, sort, filter);

                    //Tìm kiếm theo .....
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                        if (params.email) {
                            query += `email=/${params.email}/i`
                        }
                        if (params.fullName) {
                            query += `fullName=/${params.fullName}/i`
                        }

                        const createDateRange = dateRangeValidate (params.createdAtRange);
                        if (createDateRange) {
                            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`
                        }
                    }

                    //sắp xếp theo thứ tự 
                    if(sort && sort.createdAt){
                        query += `&sort=${sort.createdAt === "ascend" ? "createdAt" : "-createdAt"}`
                    }

                    const res = await getUserAPI(query);

                    if (res.data) {
                        setMeta(res.data.meta);
                    }

                    await waitTime(1000);//delay hàm ở trên á
                    // const data = await (await fetch('https://proapi.azurewebsites.net/github/issues')).json()
                    return {
                        // data: data.data,
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total,
                        // "total": 30
                    }

                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: { fixed: 'right', disable: true },
                    },
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="_id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                //Mỗi trang có 5 pageSize: 5 → mỗi trang có 5 bản ghi. onChange → log số trang khi người dùng đổi trang.
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => {
                        return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                    }
                }}
                dateFormatter="string"
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
        </>
    );
};

export default TableUser;