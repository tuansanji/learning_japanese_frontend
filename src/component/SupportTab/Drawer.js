import { Button, Drawer, Space } from "antd";

const DrawerApp = ({
  title = "chỉnh sửa",
  children,
  openDrawer,
  setOpenDrawer,
}) => {
  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={openDrawer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};
export default DrawerApp;
