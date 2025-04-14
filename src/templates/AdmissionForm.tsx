import {
  Document,
  Page,
  PDFViewer,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import condensedSource from "/RobotoCondensed-VariableFont.ttf";

Font.register({ family: "RobotoCondensed", src: condensedSource });
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/Roboto-300.ttf", fontWeight: 300 },
    { src: "/Roboto-400.ttf" },
    { src: "/Roboto-500.ttf", fontWeight: 500 },
    { src: "/Roboto-600.ttf", fontWeight: 600 },
    { src: "/Roboto-700.ttf", fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    fontFamily: "Roboto",
    fontWeight: 300,
  },
  banner: {
    backgroundColor: "#52525c",
    width: "100%",
    color: "white",
    fontSize: "10pt",
    paddingHorizontal: "16px",
    paddingVertical: "4px",
    justifyContent: "center",
    fontFamily: "RobotoCondensed",
    flexDirection: "row",
  },
  section: {
    fontSize: "12pt",
    paddingHorizontal: 24,
    width: "100%",
  },
  container: {
    backgroundColor: "#eeeef0",
    width: "100%",
    padding: 16,
  },
  containerTitle: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 12,
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",

    gap: "8px",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  bullet: {
    width: 24,
    fontWeight: 500,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  normalText: {},
});

const rules = [
  "Our academy is affiliated with Mahagujarat Gandharv Sangeet Samiti, Surat and all courses taught by our institute are government recognized.",
  "Registration fees will be charged only once at the time of admission.",
  "The first installment of fees should be paid at the time of registration. Fees once paid will not be refunded.",
  "Examination fees will be charged separately.",
  "In case of irregularity and non-payment of fees, a PENALTY will be charged and the student will not be allowed to appear for the examination.",
  "Students should maintain discipline and uphold the decorum of the music academy.",
  "Regular riyaz must be done by the student without fail.",
  "Parents are not allowed to enter the academy during an ongoing session.",
  "Parents of children below age 10 should personally drop and pick their child from the academy.",
  "Students must attend classes regularly and should not remain absent without prior notice.",
  "It is compulsory for all students to attend the practice sessions and appear for the examination.",
  "Students enrolled in the academy are informed to use the lift at their own risk, as only 4 persons are allowed at a time.",
];

export default function AdmissionForm() {
  return (
    <>
      <PDFViewer className="h-screen w-full">
        <Document>
          {/* First Page */}
          <Page size="A4" style={styles.page}>
            {/* Logo */}
            <Image
              source={"/swaramlogo.jpg"}
              style={{ objectFit: "cover", width: "45%" }}
            />
            {/* Details Banner */}
            <View style={styles.banner}>
              <Text>
                A-408, Raj Corner, Opp. Vasupujya Residency, Pal, Surat - 395
                009
              </Text>
            </View>
            <View style={[styles.banner, { gap: "24px", marginTop: "-1px" }]}>
              <Text>Email: swaram.music.academy@gmail.com</Text>
              <Text>Mobile: +91 75730 34123, +91 98980 94123</Text>
            </View>
            {/* Body */}
            <View style={[styles.section, { margin: 16 }]}>
              <Text
                style={{
                  fontSize: "18pt",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Admission Form
              </Text>
            </View>
            <View
              style={[
                styles.section,
                {
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>
                Date:{" "}
                {new Date().toLocaleString("en-gb", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </Text>
              <Text>GR. NO.: {"532"}</Text>
            </View>
            {/* Personal Details */}
            <View style={[styles.section, { marginTop: 16 }]}>
              <View style={styles.container}>
                <Text style={styles.containerTitle}>Personal Details</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 32,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      gap: "4px",
                      fontWeight: "600",
                    }}
                  >
                    <Text>Name</Text>
                    <Text>Age</Text>
                    <Text>Gender</Text>
                    <Text>Address</Text>
                    <Text>City</Text>
                    <Text>State</Text>
                    <Text>Pincode</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    <Text>{"Rahul Sharma"}</Text>
                    <Text>{"24"}</Text>
                    <Text>{"Male"}</Text>
                    <Text>{"45/A, MG Road, Sector 21"}</Text>
                    <Text>{"Pune"}</Text>
                    <Text>{"Maharashtra"}</Text>
                    <Text>{"411001"}</Text>
                  </View>
                  <View
                    style={{
                      width: "100px",
                      height: "114px",
                      border: "1px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      source={{
                        uri: "https://bgqzfrelvcoeygjokpvw.supabase.co/storage/v1/object/public/avatars//admin.png",
                        method: "GET",
                        headers: { "Cache-control": "no-cache" },
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* Contact Details */}
            <View style={[styles.section, { marginTop: 16 }]}>
              <View style={styles.container}>
                <Text style={styles.containerTitle}>Contact Details</Text>
                <View style={{ display: "flex", gap: "8px" }}>
                  {/* Mapping contact Detail Entry */}
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: "4px",
                        // marginTop: 20 -> For all elements except 0
                      }}
                    >
                      <Text>
                        <Text style={{ fontWeight: "600" }}>Name:</Text>{" "}
                        {"Rakesh Sharma"}
                      </Text>
                      <Text style={{ marginLeft: "auto" }}>{"Parent"}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: "20px" }}>
                      <View style={{ gap: "5px", fontWeight: "500" }}>
                        <Text>Mobile Number</Text>
                        <Text>Whatsapp Number</Text>
                        <Text>Email</Text>
                      </View>
                      <View style={{ gap: "5px" }}>
                        <Text>+91 98798 79879</Text>
                        <Text>+91 98797 98798</Text>
                        <Text>email12345@gmail.com</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: "4px",
                        marginTop: 20,
                      }}
                    >
                      <Text>
                        <Text style={{ fontWeight: "600" }}>Name:</Text>{" "}
                        {"Rakesh Sharma"}
                      </Text>
                      <Text style={{ marginLeft: "auto" }}>{"Parent"}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: "20px" }}>
                      <View style={{ gap: "2px", fontWeight: "500" }}>
                        <Text>Mobile Number</Text>
                        <Text>Whatsapp Number</Text>
                        <Text>Email</Text>
                      </View>
                      <View style={{ gap: "2px" }}>
                        <Text>+91 98798 79879</Text>
                        <Text>+91 98797 98798</Text>
                        <Text>email12345@gmail.com</Text>
                      </View>
                    </View>
                  </>
                </View>
              </View>
            </View>
            {/* Enrollment Details */}
            <View style={[styles.section, { marginTop: 16 }]}>
              <View style={styles.container}>
                <Text style={styles.containerTitle}>Enrollment Details</Text>
                <View style={{ flexDirection: "row", gap: 44 }}>
                  <View style={{ gap: 4 }}>
                    <Text style={{ fontWeight: 500, marginBottom: 4 }}>
                      Course
                    </Text>
                    <Text>Vocal Classical</Text>
                    <Text>Tabla</Text>
                  </View>
                  <View style={{ gap: 4 }}>
                    <Text style={{ fontWeight: 500, marginBottom: 4 }}>
                      Music Examination Year
                    </Text>
                    <Text>5</Text>
                    <Text>2</Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
          {/* Second Page */}
          <Page size={"A4"} style={styles.page}>
            <View style={[styles.section, { marginVertical: 32 }]}>
              <View style={styles.container}>
                <Text style={styles.containerTitle}>Rules and Regulations</Text>
                <View style={styles.column}>
                  {rules.map((rule, index) => (
                    <View key={index} style={styles.row}>
                      <View style={styles.bullet}>
                        <Text>{"\u2022" + " "}</Text>
                      </View>
                      <View style={styles.bulletText}>
                        <Text>
                          <Text>{rule}</Text>
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <Text style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 500 }}>NOTICE:</Text> The Academy
                  does not take responsibility for students who do not follow
                  the above-mentioned rules.
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.section,
                {
                  marginTop: "auto",
                  marginBottom: 32,
                  flexDirection: "row",
                  justifyContent: "space-around",
                },
              ]}
            >
              <Text style={{ borderTop: "1px solid #7f7f7f", padding: 8 }}>
                Guardian Signature
              </Text>
              <Text style={{ borderTop: "1px solid #7f7f7f", padding: 8 }}>
                Students Signature
              </Text>
              <Text style={{ borderTop: "1px solid #7f7f7f", padding: 8 }}>
                Office Staff Signature
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
