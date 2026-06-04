import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
    <Card
        sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            backgroundColor: "rgba(255,255,255,0.96)",
            paddingRight: 4,
        }}
    >
        <CardContent
            sx={{
                px: 3.5,
                py: 3,
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                            color: "primary.main",
                        }}
                    >
                        <Icon fontSize="small" />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 700 }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                {children}
            </Stack>
        </CardContent>
    </Card>
);

export default SectionCard;