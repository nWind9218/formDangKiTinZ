import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Alert, Chip } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { calMoney, createQRLink } from "./Banking"
import { useSearchParams } from "react-router-dom"

// Animation cho hiệu ứng scan
const scanAnimation = keyframes`
  0% {
    top: 0;
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 1;
  }
`

const scanBorderAnimation = keyframes`
  0%, 100% {
    border-color: #e53e3e;
    box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.3);
  }
  50% {
    border-color: #2b6cb0;
    box-shadow: 0 0 0 2px rgba(43, 108, 176, 0.3);
  }
`

const StyledContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f8fafc",
})

const MainCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  backgroundColor: "white",
  maxWidth: "900px",
  width: "100%",
}))

const VietQRLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  "& .viet": {
    color: "#e53e3e",
    fontWeight: "bold",
    fontSize: "20px",
  },
  "& .qr": {
    color: "#2b6cb0",
    fontWeight: "bold",
    fontSize: "20px",
  },
})

const QRContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
  padding: "16px",
  borderRadius: "12px",
  background: "linear-gradient(145deg, #ffffff, #f1f5f9)",
})

const QRCodeWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
  borderRadius: "8px",
  overflow: "hidden",
  animation: `${scanBorderAnimation} 2s ease-in-out infinite`,
  border: "3px solid #e53e3e",
})

const ScanLine = styled(Box)({
  position: "absolute",
  left: "0",
  right: "0",
  height: "2px",
  background: "linear-gradient(90deg, transparent, #e53e3e, transparent)",
  animation: `${scanAnimation} 2s ease-in-out infinite`,
  zIndex: 1,
})

const ScanCorner = styled(Box)({
  position: "absolute",
  width: "20px",
  height: "20px",
  border: "3px solid #e53e3e",

  "&.top-left": {
    top: "-3px",
    left: "-3px",
    borderRight: "none",
    borderBottom: "none",
  },
  "&.top-right": {
    top: "-3px",
    right: "-3px",
    borderLeft: "none",
    borderBottom: "none",
  },
  "&.bottom-left": {
    bottom: "-3px",
    left: "-3px",
    borderRight: "none",
    borderTop: "none",
  },
  "&.bottom-right": {
    bottom: "-3px",
    right: "-3px",
    borderLeft: "none",
    borderTop: "none",
  },
})

const BankLogos = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  marginTop: "16px",
  "& .napas": {
    color: "#2b6cb0",
    fontWeight: "bold",
    fontSize: "14px",
  },
  "& .agribank": {
    color: "#e53e3e",
    fontWeight: "bold",
    fontSize: "12px",
  },
})

const CompactList = styled(List)({
  padding: 0,
  "& .MuiListItem-root": {
    paddingTop: "4px",
    paddingBottom: "4px",
  },
})

export default function QRPaymentPage() {
  
  const [searchParams] = useSearchParams()
  const psid = searchParams.get("content")
  const isTinZStudent = searchParams.get("TinZstudent")
  const numOfRegisteredSubj = searchParams.get("amount")
  const link = createQRLink(psid, numOfRegisteredSubj, isTinZStudent)
  const MainCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  backgroundColor: "white",
  width: "100%",       // đảm bảo full width của container cha
  maxWidth: "1000px",  // hoặc giá trị bạn muốn
}))
  return (
    <StyledContainer maxWidth={false}>
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        gutterBottom
        sx={{ color: "#475569", fontWeight: 600, mb: 3 }}
      >
        Mã QR chuyển khoản ngân hàng
      </Typography>
      {console.log()}
      <MainCard>
        <Grid container spacing={3} alignItems="center">
          {/* Left side - QR Code */}
          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              <VietQRLogo>
                <span className="viet">VIET</span>
                <span className="qr">QR</span>
              </VietQRLogo>
              <QRContainer> 
                <QRCodeWrapper>
                  <ScanLine />
                  <ScanCorner className="top-left" />
                  <ScanCorner className="top-right" />
                  <ScanCorner className="bottom-left" />
                  <ScanCorner className="bottom-right" />
                  <img
                    src= {link}
                    alt="QR Code for payment"
                    style={{
                      width: "200px",
                      height: "200px",
                      display: "block",
                    }}
                  />
                </QRCodeWrapper>
              </QRContainer>

              <BankLogos>
                <span className="napas">napas 247</span>
                <Box sx={{ width: "1px", height: "16px", bgcolor: "#e2e8f0" }} />
                <span className="agribank">🏛️ AGRIBANK</span>
              </BankLogos>
            </Box>
          </Grid>

          {/* Right side - Order Information */}
          <Grid item xs={12} md={6}>
            <Alert
              severity="success"
              sx={{
                mb: 2,
                backgroundColor: "#f0fdf4",
                color: "#166534",
                fontSize: "14px",
                "& .MuiAlert-icon": { fontSize: "18px" },
              }}
            >
              Cảm ơn bạn. Đơn hàng đã được nhận.
            </Alert>

            <Paper sx={{ p: 2, backgroundColor: "#f8fafc", borderRadius: 2 }}>
              <CompactList>
                <ListItem>
                  <ListItemText
                    primary="Mã đơn hàng"
                    secondary={<Chip label={psid} size="small" color="primary" />}
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Chủ khoản"
                    secondary="1396888686"
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                    secondaryTypographyProps={{ fontSize: "13px" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary="admin@demo.tsedu.vn"
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                    secondaryTypographyProps={{ fontSize: "13px" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Tổng cộng"
                    secondary={
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {calMoney(isTinZStudent, numOfRegisteredSubj)} đ
                      </Typography>
                    }
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phương thức"
                    secondary="Chuyển khoản QR"
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                    secondaryTypographyProps={{ fontSize: "13px" }}
                  />
                </ListItem>
              </CompactList>
            </Paper>
          </Grid>
        </Grid>

        {/* Bank Transfer Information - Compact
        <Box mt={3}>
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ color: "#475569", fontWeight: 600, mb: 2 }}
          >
            Thông tin chuyển khoản
          </Typography>

          <Alert severity="warning" sx={{ mb: 2, fontSize: "13px" }}>
            <strong>Nội dung chuyển khoản: TSEDUVN280</strong>
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 1.5, backgroundColor: "#f1f5f9" }}>
                <CompactList>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText
                      primary="Tên TK"
                      secondary="Nguyen Van XXX"
                      primaryTypographyProps={{ fontSize: "12px", fontWeight: 600 }}
                      secondaryTypographyProps={{ fontSize: "13px" }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText
                      primary="Số TK"
                      secondary="0123XXXXXXXXX"
                      primaryTypographyProps={{ fontSize: "12px", fontWeight: 600 }}
                      secondaryTypographyProps={{ fontSize: "13px" }}
                    />
                  </ListItem>
                </CompactList>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 1.5, backgroundColor: "#f1f5f9" }}>
                <CompactList>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText
                      primary="Ngân hàng"
                      secondary="Agribank"
                      primaryTypographyProps={{ fontSize: "12px", fontWeight: 600 }}
                      secondaryTypographyProps={{ fontSize: "13px" }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText
                      primary="Số tiền"
                      secondary={
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          340,000 vnđ
                        </Typography>
                      }
                      primaryTypographyProps={{ fontSize: "12px", fontWeight: 600 }}
                    />
                  </ListItem>
                </CompactList>
              </Paper>
            </Grid>
          </Grid>
        </Box> */}
      </MainCard>
    </StyledContainer>
  )
}
