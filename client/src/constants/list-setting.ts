import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import ListIcon from '@mui/icons-material/List';
import LanguageIcon from '@mui/icons-material/Language';
import HelpIcon from '@mui/icons-material/Help';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';

export const LIST_MENU_SETTING = [
    {
        Icon: SettingsIcon,
        label: `Cài đặt & quyền riêng tư`,
        subMenu: [
            {
                Icon: SettingsIcon,
                label: `Cài đặt`,
                to: `/settings`
            },
            {
                label: `Kiểm tra quyền riêng tư`,
                to: `/`,
                Icon: LockIcon
            },
            {
                label: `Trung tâm quyền riêng tư`,
                to: `/`,
                Icon: LockIcon
            },
            {
                label: `Nhật ký hoạt động`,
                to: `/`,
                Icon: ListIcon
            },
            {
                label: `Ngôn ngữ`,
                to: `/`,
                Icon: LanguageIcon
            },
        ]
    },
    {
        Icon: HelpIcon,
        label: `Trợ giúp & hỗ trợ`,
        subMenu: [
            {
                label: `Trung tâm trợ giúp`,
                to: `/`,
                Icon: HelpIcon
            },
            {
                label: `Hộp thư hỗ trợ`,
                to: `/`,
                Icon: MarkAsUnreadIcon
            },
            {
                label: `Báo cáo sự cố`,
                to: `/`,
                Icon: ReportProblemIcon
            }
        ]
    },
    {
        Icon: DarkModeIcon,
        label: `Màn hình & trợ năng`,
        to: `/`
    },
    {
        Icon: ChatIcon,
        label: `Đóng góp ý kiến`,
        to: `/`
    },
    {
        Icon: LogoutIcon,
        label: `Đăng xuất`,
        to: `/`
    }
];


export const LIST_SETTING = [
    {
        label: `Chung`,
        to: `/settings`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/cMDqLX1Td21.png`
    },
    {
        label: `Bảo mật và đăng nhập`,
        to: `/settings/security`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/W_cLjKn98PX.png`
    },
    {
        label: `Thông tin của bạn trên facebook`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/R4BydvG-BDV.png`
    },
    {
        label: `Quyền riêng tư`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/tMdk7-jeF8A.png`
    },
    {
        label: `Nhận dạng khuôn mặt`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/E3P3nQ4d1Jc.png`
    },
    {
        label: `Trang cá nhân và gắn thẻ`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/EHvRY_MEcKV.png`
    },
    {
        label: `Bài viết công khai`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/wLRvNLOhj76.png`
    },
    {
        label: `Chặn`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/eGXe991XXgH.png`
    },
    {
        label: `Chung`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/cMDqLX1Td21.png`
    },
    {
        label: `Vị trí`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/3eOb5GUAhey.png`
    },
    {
        label: `Ngôn ngữ và khu vực`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/xo7Cwc8B2Ub.png`
    },
    {
        label: `Tin`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/12IbSCtsJbv.png`
    },
    {
        label: `Thông báo`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/uTwaZtiEhSd.png`
    },
    {
        label: `Di động`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/5KHqCim3f4J.png`
    },
    {
        label: `Ứng dụng và trang web`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/WmJRHrfsen4.png`
    },
    {
        label: `Tiện ích tích hợp cho doanh nghiệp`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/8tveKGfIjqZ.png`
    },
    {
        label: `Quảng cáo`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/_H5EzC2vThA.png`
    },
    {
        label: `Thanh toán quảng cáo`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/ZWU-EFrJdYi.png`
    },
    {
        label: `Facebook Pay`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/3o4tOrcXaVx.png`
    },
    {
        label: `Hộp thư hỗ trợ`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/OEw9zCFVvkr.png`
    },
    {
        label: `Video`,
        to: `/settings/account`,
        src: `https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/itWMqXsqxDC.png`
    },

]