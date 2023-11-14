import { Card, Typography } from "@material-tailwind/react";
import { format, parseISO } from "date-fns";


const NotificationTable = ({ data }) => {
    const TABLE_HEAD = ["Content", "Recipient", "Sent On"];
    const TABLE_ROWS = [];

    data.map((obj) => {
        TABLE_ROWS.push(
            {
                content: obj.content,
                recipients: obj.recipients.join(', '),
                sentOn: format(parseISO(obj.sentAt), 'dd-MMM h:mm aa'),
            }
        );
    });
    // Sort TABLE_ROWS based on sentOn in descending order
    TABLE_ROWS.sort((a, b) => {
        const dateA = new Date(a.sentOn).getTime();
        const dateB = new Date(b.sentOn).getTime();

        // Sort in descending order
        return dateB - dateA;
    });

    return (
        <>
            <Card className="max-h-[50vh] w-full overflow-y-scroll">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr>
                            { TABLE_HEAD.map((head) => (
                                <th
                                    key={ head }
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        { head }
                                    </Typography>
                                </th>
                            )) }
                        </tr>
                    </thead>
                    <tbody className="">
                        { TABLE_ROWS.map(({ content, recipients, sentOn }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={ content }>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { content }
                                        </Typography>
                                    </td>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { recipients }
                                        </Typography>
                                    </td>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { sentOn }
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>
            </Card>
        </>
    );
}

export default NotificationTable;