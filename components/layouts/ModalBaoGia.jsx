"use client";
import React from "react";
import { Modal, Form, Input, ConfigProvider, message } from "antd";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

const ModalBaoGia = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSendData = async (values) => {
    try {
      const response = await axios.post(
        `${ENDPOINT.GET_KHACH_HANG}`,
        {
          data: {
            name: values.fullname,
            phone: values.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        message.success({
          content: "Yêu cầu của bạn đã được tiếp nhận. Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.",
          style: { marginTop: '20vh' },
        });
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error("Error sending data:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline trực tiếp.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#D4A373',
          fontFamily: 'var(--font-heading)',
        },
      }}
    >
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={600}
        closeIcon={<span className="text-xl font-light hover:text-beauty-primary opacity-40">×</span>}
      >
        <div className="p-8 md:p-12 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="h-[1px] w-8 bg-beauty-primary/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
                Đăng Ký Tư Vấn
              </span>
              <span className="h-[1px] w-8 bg-beauty-primary/40"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display italic text-beauty-dark leading-tight">
              Đăng Ký Tư Vấn Chuyên Sâu
            </h2>
            <p className="text-sm font-light text-beauty-charcoal/40 tracking-widest uppercase">
              Bắt đầu hành trình tỏa sáng rạng ngời của bạn.
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSendData}
            className="space-y-8"
            requiredMark={false}
          >
            <div className="space-y-6">
              <Form.Item
                name="fullname"
                rules={[{ required: true, message: "Vui lòng nhập họ tên." }]}
              >
                <Input
                  placeholder="Họ và Tên"
                  className="!bg-transparent !border-b !border-black/5 !py-4 !px-0 !placeholder-black/20 !text-xl"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại." },
                ]}
              >
                <Input
                  placeholder="Số Điện Thoại"
                  className="!bg-transparent !border-b !border-black/5 !py-4 !px-0 !placeholder-black/20 !text-xl"
                  maxLength={11}
                />
              </Form.Item>
            </div>

            <div className="space-y-6 pt-4">
              <button
                type="submit"
                className="btn-premium-gold w-full !py-6 !text-[11px]"
              >
                Xác Nhận Đặt Lịch
              </button>
              
              <p className="text-[10px] text-center text-beauty-charcoal/30 uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">
                Cam kết bảo mật thông tin. Dữ liệu của bạn được bảo vệ trong hệ thống chuyên biệt.
              </p>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ModalBaoGia;
